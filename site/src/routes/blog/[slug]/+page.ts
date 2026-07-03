import type { Frontematter } from '$lib/utils/types';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../content/blog/${params.slug}.md`);
		const { title, date } = post.metadata as Frontematter;
		const body = post.default;
		return {
			body,
			title,
			date
		};
	} catch (e) {
		throw error(404, 'Post not found');
	}
};
