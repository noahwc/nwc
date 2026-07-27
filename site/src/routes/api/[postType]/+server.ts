import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { getPhotos } from '$lib/photos';
import { getGalleries } from '$lib/galleries';

export const prerender = true;

const blogFiles = import.meta.glob('/src/content/blog/*.md');

async function getBlog() {
	return Promise.all(
		Object.entries(blogFiles).map(async ([filepath, resolver]) => {
			const { metadata } = await (
				resolver as () => Promise<{ metadata: Record<string, string> }>
			)();
			const slug = filepath.split('/').pop()!.replace(/\.md$/, '');
			return { meta: metadata, path: `/blog/${slug}` };
		})
	);
}

export const GET = async ({ params }: RequestEvent) => {
	switch (params.postType as 'photos' | 'galleries' | 'blog') {
		case 'photos':
			return json(await getPhotos());
		case 'galleries':
			return json(await getGalleries());
		case 'blog':
			return json(await getBlog());
		default:
			return json({ error: 'not found' }, { status: 404 });
	}
};
