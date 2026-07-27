import { redirect } from '@sveltejs/kit';

const photoGlob = import.meta.glob('/src/content/photos/*.jpg', { eager: true, query: '?url' });

export const entries = () =>
	Object.keys(photoGlob).map((p) => ({
		slug: p
			.split('/')
			.pop()!
			.replace(/\.jpg$/i, '')
	}));

export const load = ({ params }: { params: { slug: string } }) => {
	throw redirect(308, `/photos/${params.slug}`);
};
