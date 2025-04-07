export const fetchPosts = async (type: 'blog' | 'gallery' | 'albums') => {
	interface MarkdownFile {
		metadata: unknown;
		default: unknown;
	}

	type MarkdownFileImport = [string, () => Promise<MarkdownFile>][];
	type postGlob = Record<string, () => Promise<unknown>>;

	let postFiles: postGlob;

	// Use separate import.meta.glob calls with literal strings
	if (type === 'gallery') {
		postFiles = import.meta.glob('/src/routes/gallery/*.md');
	} else if (type === 'albums') {
		postFiles = import.meta.glob('/src/routes/albums/*.md');
	} else {
		postFiles = import.meta.glob('/src/routes/blog/*.md');
	}

	const postsList = Object.entries(postFiles) as MarkdownFileImport;

	const allPosts = await Promise.all(
		postsList.map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			return { meta: metadata, path: path.slice(11, -3) };
		})
	);

	return allPosts;
};
