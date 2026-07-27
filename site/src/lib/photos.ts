import exifr from 'exifr';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';

export type Image = {
	sources: Record<string, string>;
	img: { src: string; w: number; h: number };
};

export type Photo = {
	id: string;
	title: string;
	date: string;
	description?: string;
	url: Image;
};

/** id = filename without extension. */
const idOf = (p: string) =>
	p
		.split('/')
		.pop()!
		.replace(/\.jpg$/i, '');

/** All source photos, processed by enhanced-img at four widths. Browser-safe. */
const photoAssets = import.meta.glob<Image>('/src/content/photos/*.jpg', {
	query: { enhanced: true, w: '1400;1000;700;400' },
	import: 'default',
	eager: true
});

type Override = { title?: string; date?: string; description?: string };

const ROOT = process.cwd();
const overrides = (() => {
	const file = join(ROOT, 'src/content/photos.meta.yaml');
	if (!existsSync(file)) return {} as Record<string, Override>;
	return (parseYaml(readFileSync(file, 'utf8')) ?? {}) as Record<string, Override>;
})();

const dateCache: Record<string, string> = {};
const dateOf = async (id: string, abs: string): Promise<string> => {
	if (dateCache[id]) return dateCache[id];
	let date = '';
	try {
		const exif = await exifr.parse(abs, { exif: true });
		const d = exif?.DateTimeOriginal ?? exif?.CreateDate ?? exif?.ModifyDate;
		date = d instanceof Date ? d.toISOString() : '';
	} catch {
		/* no exif */
	}
	if (!date) {
		try {
			date = statSync(abs).mtime.toISOString();
		} catch {
			/* unreadable */
		}
	}
	dateCache[id] = date;
	return date;
};

let cache: Promise<Photo[]> | undefined;

/** Every photo as a record, newest-first. Server-only (fs + exifr). */
export const getPhotos = (): Promise<Photo[]> => {
	if (!cache) {
		cache = (async () => {
			const photos: Photo[] = [];
			for (const [filepath, url] of Object.entries(photoAssets)) {
				const id = idOf(filepath);
				const abs = join(ROOT, filepath.slice(1));
				const ov = overrides[id] ?? {};
				photos.push({
					id,
					title: ov.title ?? id,
					date: ov.date ?? (await dateOf(id, abs)),
					description: ov.description,
					url
				});
			}
			photos.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
			return photos;
		})();
	}
	return cache;
};

export const getPhoto = async (id: string): Promise<Photo | undefined> =>
	(await getPhotos()).find((p) => p.id === id);
