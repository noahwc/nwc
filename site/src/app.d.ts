import type { Image } from '$lib/photos';

// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

/** One thumbnail in a grid. */
export interface GalleryThumb {
	url: Image;
	alt: string;
	href: string;
}

/** One card on the galleries index. */
export interface GalleryMeta {
	slug: string;
	title: string;
	description?: string;
	cover?: Image;
}

export type { Image } from '$lib/photos';
