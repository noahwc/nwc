import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md']
		})
	],

	kit: {
		adapter: adapter(),
		prerender: {
			entries: [
				'*',
				'/blog',
				'/blog/*',
				'/photos',
				'/photos/*',
				'/galleries',
				'/galleries/*',
				'/api/blog',
				'/api/photos',
				'/api/galleries',
				// legacy redirects, kept for old links
				'/gallery',
				'/gallery/*',
				'/albums',
				'/albums/*'
			]
		}
	},

	extensions: ['.svelte', '.svx', '.md']
};

export default config;
