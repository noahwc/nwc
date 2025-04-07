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
	meta: { url: string | Image; [key: string]: unknown };
	path: string;
}
interface Album {
	meta: { cover: string | Image; [key: string]: unknown };
	path: string;
}

export { Post, Album };
