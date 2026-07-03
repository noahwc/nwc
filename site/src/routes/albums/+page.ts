import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch(`/api/albums`);
	const albums = await response.json();
	return { albums };
};
