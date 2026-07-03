import { fetchPosts } from '$lib/utils/fetchPosts';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export const prerender = true;

export const GET = async ({ params }: RequestEvent) => {
	const allPosts = await fetchPosts(params.postType as 'blog' | 'gallery' | 'albums');

	return json(allPosts);
};
