import type { PageLoad } from './$types';
import type { Gallery } from '$lib/galleries';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/api/galleries');
	const galleries: Gallery[] = await response.json();
	return { galleries };
};
