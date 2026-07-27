import type { PageLoad } from './$types';
import type { GalleryThumb } from '../../app';
import type { Photo } from '$lib/photos';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/api/photos');
	const photos: Photo[] = await response.json();
	const items: GalleryThumb[] = photos.map((p) => ({
		url: p.url,
		alt: p.title,
		href: `/photos/${p.id}`
	}));
	return { items };
};
