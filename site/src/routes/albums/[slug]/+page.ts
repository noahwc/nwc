import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { AlbumThumb } from '../../../app';
import type { Album } from '$lib/albums';
import { stem } from '$lib/path-utils';

const albumGlob = import.meta.glob('/src/content/albums/*.yml', { eager: true, query: '?raw' });

export const entries = () => Object.keys(albumGlob).map((p) => ({ slug: stem(p) }));

export const load: PageLoad = async ({ params, fetch }) => {
	const response = await fetch('/api/albums');
	const albums: Album[] = await response.json();
	const album = albums.find((a) => a.slug === params.slug);
	if (!album) throw error(404, 'Album not found');

	const items: AlbumThumb[] = album.images.map((e) => ({
		url: e.url,
		alt: e.title,
		href: `/photos/${e.id}`
	}));

	return { title: album.title, description: album.description, items };
};
