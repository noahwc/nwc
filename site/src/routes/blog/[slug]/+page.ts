import type { Frontematter } from '$lib/utils/types';

export async function load({ params }) {
	try {
		const post = await import(`../${params.slug}.md`);
		const { title, date } = post.metadata as Frontematter;
		const body = post.default;
		return {
			body,
			title,
			date
		};
	} catch (error) {
		console.log('Error loading post! \n', error);
	}
}
