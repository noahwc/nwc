import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { readableDateTransform } from '$lib/utils/utils';
import type { Photo } from '$lib/photos';
import type { Album } from '$lib/albums';
import { stem } from '$lib/path-utils';

const photoGlob = import.meta.glob('/src/content/photos/*.jpg', { eager: true, query: '?url' });

export const entries = () => Object.keys(photoGlob).map((p) => ({ id: stem(p) }));

export const load: PageLoad = async ({ params, fetch }) => {
	const id = params.id;
	const photoRes = await fetch('/api/photos');
	const photos: Photo[] = await photoRes.json();
	const photo = photos.find((p) => p.id === id);
	if (!photo) throw error(404, 'Photo not found');

	const albumRes = await fetch('/api/albums');
	const albums: Album[] = await albumRes.json();
	const inAlbums = albums
		.filter((a) => a.images.some((e) => e.id === id))
		.map((a) => ({ slug: a.slug, title: a.title }));

	return { photo, albums: inAlbums, dateLabel: readableDateTransform(photo.date || '') };
};
