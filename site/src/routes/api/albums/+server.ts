import { fetchPosts } from '../../../lib/utils/fetchPosts';
import { json } from '@sveltejs/kit';

export const prerender = true;

// TODO: add parameter checking for albums

export const GET = async () => {
	const allPosts = await fetchPosts('albums');

	return json(allPosts);
};
