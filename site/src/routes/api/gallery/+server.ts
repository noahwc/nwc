import { fetchPosts } from '../../../lib/utils/fetchPosts';
import { json } from '@sveltejs/kit';

// TODO: add parameter checking for albums

export const GET = async () => {
	const allPosts = await fetchPosts('gallery');

	return json(allPosts);
};
