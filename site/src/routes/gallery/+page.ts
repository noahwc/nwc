import type { PageLoad } from './$types';
import { gallery } from '$lib';
import type { Post } from '../../app';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch(`/api/gallery`);
	const posts = await response.json();
	const postsImageInjected = posts.map((post: Post) => {
		return { ...post, meta: { ...post.meta, url: gallery[post.meta.url] } };
	});
	const image = gallery[posts[0].meta.url];
	console.log('image (server)', image);
	console.log('postsImageInjected', postsImageInjected);
	return { posts: postsImageInjected, image };
};
