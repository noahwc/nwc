import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { readableDateTransform } from '$lib/utils/utils';
import type { Photo } from '$lib/photos';
import type { Gallery } from '$lib/galleries';

const photoGlob = import.meta.glob('/src/content/photos/*.jpg', { eager: true, query: '?url' });

export const entries = () =>
	Object.keys(photoGlob).map((p) => ({
		id: p
			.split('/')
			.pop()!
			.replace(/\.jpg$/i, '')
	}));

export const load: PageLoad = async ({ params, fetch }) => {
	const id = params.id;
	const photoRes = await fetch('/api/photos');
	const photos: Photo[] = await photoRes.json();
	const photo = photos.find((p) => p.id === id);
	if (!photo) throw error(404, 'Photo not found');

	const galleryRes = await fetch('/api/galleries');
	const galleries: Gallery[] = await galleryRes.json();
	const inGalleries = galleries
		.filter((g) => g.images.some((e) => e.id === id))
		.map((g) => ({ slug: g.slug, title: g.title }));

	return { photo, galleries: inGalleries, dateLabel: readableDateTransform(photo.date || '') };
};
