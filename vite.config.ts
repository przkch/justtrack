import basicSsl from '@vitejs/plugin-basic-ssl';
import Icons from 'unplugin-icons/vite';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import { FileSystemIconLoader } from 'unplugin-icons/loaders';

export default defineConfig({
	plugins: [
		basicSsl(),
		Icons({
			compiler: 'svelte',
			customCollections: {
				justtrack: FileSystemIconLoader('./static/icons', (svg) =>
					svg.replace(/^<svg /, '<svg fill="currentColor" ')
				)
			}
		}),
		sveltekit(),
		tailwindcss()
	]
});
