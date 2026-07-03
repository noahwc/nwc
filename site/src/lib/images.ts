type Image = {
	sources: { avif: string; webp: string; png: string };
	img: { src: string; w: number; h: number };
};

export const albumImages = import.meta.glob<Image>('/src/content/albums/*/*.jpg', {
	query: { enhanced: true, w: '1400;1000;700;400' },
	import: 'default',
	eager: true
});
