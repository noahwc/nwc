import type { Frontematter } from '$lib/utils/types';
import { gallery } from '$lib';

export async function load({ params }) {
	const post = await import(`../${params.slug}.md`);
	const { title, date, url } = post.metadata as Frontematter;
	const body = post.default;
	return { body, title, date, url: gallery[url] || '' };
}
