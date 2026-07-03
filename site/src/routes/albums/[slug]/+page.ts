import type { Frontematter } from '$lib/utils/types';
import type { Post } from '../../../app';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, fetch }) => {
	try {
		const post = await import(`../../../content/albums/${params.slug}/index.md`);
		const { title } = post.metadata as Frontematter;
		const body = post.default;

		const response = await fetch(`/api/gallery`);
		const posts = await response.json();
		const filteredPosts = posts.filter((post: Post) => post.meta.url.img?.src.includes(`albums/${params.slug}/`) || (typeof post.meta.url === 'string' && post.meta.url.includes(`albums/${params.slug}/`)));
		return { body, title, posts: filteredPosts };
	} catch (e) {
		throw error(404, 'Album not found');
	}
};
