import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// 6.3.1+ needs kit.experimental (newer kit 2.x); <=6.3.4 rejects a Node 26 build unless runtime is explicit. Revisit at the Svelte 5 rebuild.
		adapter: adapter({ runtime: 'nodejs24.x' })
	}
};

export default config;
