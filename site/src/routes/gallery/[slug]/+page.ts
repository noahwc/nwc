import type { Frontematter } from '$lib/utils/types';

export async function load({ params }) {
	try {
		const post = await import(`../${params.slug}.md`);
		const { title, date, url } = post.metadata as Frontematter;
		const body = post.default;
		return {
			body,
			title,
			date,
			url
		};
	} catch (error) {
		console.log('Error loading post! \n', error);
	}
}
