export const fetchPosts = async (type: 'blog' | 'gallery') => {
	interface MarkdownFile {
		metadata: unknown;
		default: unknown;
	}

	type MarkdownFileImport = [string, () => Promise<MarkdownFile>][];

	const postFiles =
		type === 'gallery'
			? import.meta.glob(`/src/routes/gallery/*.md`)
			: import.meta.glob(`/src/routes/blog/*.md`);
	const postsList = Object.entries(postFiles) as MarkdownFileImport;

	const allPosts = await Promise.all(
		postsList.map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			return {
				meta: metadata,
				path: path.slice(11, -3)
			};
		})
	);

	return allPosts;
};
