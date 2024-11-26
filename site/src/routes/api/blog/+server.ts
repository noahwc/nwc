import { fetchPosts } from '../../../lib/utils/fetchPosts';
import { json } from '@sveltejs/kit';

export const prerender = true;

export const GET = async () => {
	const allPosts = await fetchPosts('blog');

	return json(allPosts);
};
