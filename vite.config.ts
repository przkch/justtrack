import basicSsl from '@vitejs/plugin-basic-ssl';
import Icons from 'unplugin-icons/vite';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		basicSsl(),
		Icons({
			compiler: 'svelte'
		}),
		sveltekit(),
		tailwindcss()
	]
});
