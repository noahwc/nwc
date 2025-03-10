type Image = {
	sources: { avif: string; webp: string; png: string };
	img: { src: string; w: number; h: number };
};

export const gallery = import.meta.glob<Image>('$lib/gallery/*.jpg', {
	query: { enhanced: true },
	import: 'default',
	eager: true
});
