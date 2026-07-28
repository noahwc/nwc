import { parse as parseYaml } from 'yaml';
import { stem } from './path-utils';
import { getPhoto, getPhotos, type Image, type Photo } from './photos';

export type AlbumEntry = Photo;

export type Album = {
	slug: string;
	title: string;
	description?: string;
	cover?: Image;
	images: AlbumEntry[];
};

type EntryCfg = string | { id: string; title?: string; description?: string };
type AlbumCfg = { title: string; description?: string; cover?: string; images: EntryCfg[] };

const albumRaw = import.meta.glob('/src/content/albums/*.yml', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

const build = async (path: string, raw: string): Promise<Album> => {
	const cfg = (parseYaml(raw) ?? {}) as AlbumCfg;
	const byId = new Map((await getPhotos()).map((p) => [p.id, p] as const));

	const images: AlbumEntry[] = (cfg.images ?? [])
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
		.filter((e): e is AlbumEntry => e !== null);

	const cover = byId.get(cfg.cover ?? images[0]?.id ?? '')?.url as Image | undefined;

	return {
		slug: stem(path),
		title: cfg.title ?? stem(path),
		description: cfg.description,
		cover,
		images
	} satisfies Album;
};

/** All albums, in filesystem order. Server-only (imports photos). */
export let getAlbums = (): Promise<Album[]> => {
	const result = Promise.all(Object.entries(albumRaw).map(([p, raw]) => build(p, raw)));
	getAlbums = () => result;
	return result;
};

export const getAlbumBySlug = async (slug: string): Promise<Album | undefined> =>
	(await getAlbums()).find((a) => a.slug === slug);

/** Albums that include a given photo id. */
export const albumsForPhoto = async (id: string): Promise<Album[]> =>
	(await getAlbums()).filter((a) => a.images.some((e) => e.id === id));

/** Single photo record, here only to keep this the data-facing module. */
export { getPhoto };
