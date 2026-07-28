import type { PageLoad } from './$types';
import type { Album } from '$lib/albums';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/api/albums');
	const albums: Album[] = await response.json();
	return { albums };
};
