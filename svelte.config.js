import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			out: 'build',
			precompress: true,
			envPrefix: '',
			polyfill: true
		}),
		env: {
			dir: '.',
			publicPrefix: 'PUBLIC_'
		}
	}
};

export default config;