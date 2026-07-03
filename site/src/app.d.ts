// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

interface Post {
	meta: {
		url: string | Image;
		title: string;
		date: string;
		description?: string;
		[key: string]: unknown;
	};
	path: string;
}
interface Album {
	meta: { cover: string | Image; title: string; [key: string]: unknown };
	path: string;
}

export { Post, Album };
