import { gallery } from '$lib';
import type { Frontematter } from '$lib/utils/types';
import type { Post } from '../../../app';

export async function load({ params }) {
	const post = await import(`../${params.slug}.md`);
	const { title } = post.metadata as Frontematter;
	const body = post.default;

	const response = await fetch(`/api/gallery`);
	const posts = await response.json();
	posts.filter((post: Post) => post.meta.album === params.slug);
	const postsImageInjected = posts.map((post: Post) => {
		return { ...post, meta: { ...post.meta, url: gallery[post.meta.url] } };
	});
	return { body, title, posts: postsImageInjected };
}
