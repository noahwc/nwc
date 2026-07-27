import { redirect } from '@sveltejs/kit';

const galleryGlob = import.meta.glob('/src/content/galleries/*.yml', {
	eager: true,
	query: '?raw'
});

export const entries = () =>
	Object.keys(galleryGlob).map((p) => ({
		slug: p
			.split('/')
			.pop()!
			.replace(/\.ya?ml$/, '')
	}));

export const load = ({ params }: { params: { slug: string } }) => {
	throw redirect(308, `/galleries/${params.slug}`);
};
