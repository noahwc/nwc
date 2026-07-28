import type { PageLoad } from './$types';
import type { AlbumThumb } from '../../app';
import type { Photo } from '$lib/photos';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/api/photos');
	const photos: Photo[] = await response.json();
	const items: AlbumThumb[] = photos.map((p) => ({
		url: p.url,
		alt: p.title,
		href: `/photos/${p.id}`
	}));
	return { items };
};
