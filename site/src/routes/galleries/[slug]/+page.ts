import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { GalleryThumb } from '../../../app';
import type { Gallery } from '$lib/galleries';

const galleryGlob = import.meta.glob('/src/content/galleries/*.yml', {
	eager: true,
	query: '?raw'
});

export const entries = () =>
	Object.keys(galleryGlob).map((p) => ({
		slug: p
			.split('/')
			.pop()!
			.replace(/\.ya?ml$/, '')
	}));

export const load: PageLoad = async ({ params, fetch }) => {
	const response = await fetch('/api/galleries');
	const galleries: Gallery[] = await response.json();
	const gallery = galleries.find((g) => g.slug === params.slug);
	if (!gallery) throw error(404, 'Gallery not found');

	const items: GalleryThumb[] = gallery.images.map((e) => ({
		url: e.url,
		alt: e.title,
		href: `/photos/${e.id}`
	}));

	return { title: gallery.title, description: gallery.description, items };
};
