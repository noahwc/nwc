import { parse as parseYaml } from 'yaml';
import { getPhoto, getPhotos, type Image, type Photo } from './photos';

export type GalleryEntry = Photo;

export type Gallery = {
	slug: string;
	title: string;
	description?: string;
	cover?: Image;
	images: GalleryEntry[];
};

const slugOf = (p: string) =>
	p
		.split('/')
		.pop()!
		.replace(/\.ya?ml$/, '');

type EntryCfg = string | { id: string; title?: string; description?: string };
type GalleryCfg = { title: string; description?: string; cover?: string; images: EntryCfg[] };

const galleryRaw = import.meta.glob('/src/content/galleries/*.yml', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

const build = async (path: string, raw: string): Promise<Gallery> => {
	const cfg = (parseYaml(raw) ?? {}) as GalleryCfg;
	const byId = new Map((await getPhotos()).map((p) => [p.id, p] as const));

	const images: GalleryEntry[] = (cfg.images ?? [])
		.map((entry) => {
			const id = typeof entry === 'string' ? entry : entry.id;
			const base = byId.get(id);
			if (!base) return null;
			if (typeof entry === 'string') return base;
			return {
				...base,
				title: entry.title ?? base.title,
				description: entry.description ?? base.description
			};
		})
		.filter((e): e is GalleryEntry => e !== null);

	const cover = byId.get(cfg.cover ?? images[0]?.id ?? '')?.url as Image | undefined;

	return {
		slug: slugOf(path),
		title: cfg.title ?? slugOf(path),
		description: cfg.description,
		cover,
		images
	} satisfies Gallery;
};

let cache: Promise<Gallery[]> | undefined;

/** All galleries, in filesystem order. Server-only (imports photos). */
export const getGalleries = (): Promise<Gallery[]> => {
	if (!cache) cache = Promise.all(Object.entries(galleryRaw).map(([p, raw]) => build(p, raw)));
	return cache;
};

export const getGalleryBySlug = async (slug: string): Promise<Gallery | undefined> =>
	(await getGalleries()).find((g) => g.slug === slug);

/** Slugs of galleries that include a given photo id. */
export const galleriesForPhoto = async (id: string): Promise<Gallery[]> =>
	(await getGalleries()).filter((g) => g.images.some((e) => e.id === id));

/** Single photo record, here only to keep this the data-facing module. */
export { getPhoto };
