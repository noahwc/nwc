import { fetchPosts } from '../../../lib/utils/fetchPosts';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const allPosts = await fetchPosts('blog');

	return json(allPosts);
};
