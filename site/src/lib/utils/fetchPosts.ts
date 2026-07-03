import { albumImages } from '../images';

export const fetchPosts = async (type: 'blog' | 'gallery' | 'albums') => {
	interface MarkdownFile {
		metadata: Record<string, any>;
		default: unknown;
	}

	if (type === 'gallery') {
		return Object.keys(albumImages).map((filepath) => {
			return {
				meta: { url: albumImages[filepath], title: filepath.split('/').pop() },
				path: '#'
			};
		});
	}

	const globs = {
		blog: import.meta.glob('/src/content/blog/*.md'),
		albums: import.meta.glob('/src/content/albums/*/index.md')
	};

	const postFiles = globs[type];
	if (!postFiles) return [];

	const allPosts = await Promise.all(
		Object.entries(postFiles).map(async ([filepath, resolver]) => {
			const { metadata } = await (resolver as () => Promise<MarkdownFile>)();
			
			// Remove /src/content/ and file extension to get the clean path
			const path = filepath.split('/src/content/')[1].split('/index.md')[0].split('.md')[0];
			
			const resolveImage = (img: string) => {
				if (!img) return img;
				const fullPath = img.replace('./', `/src/content/${path}/`);
				return albumImages[fullPath] || albumImages[img] || img;
			};

			// Resolve images directly into the metadata
			if (metadata.cover) metadata.cover = resolveImage(metadata.cover as string);
			if (metadata.url) metadata.url = resolveImage(metadata.url as string);

			return { meta: metadata, path };
		})
	);

	return allPosts;
};
