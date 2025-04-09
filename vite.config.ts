import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server:{
		allowedHosts:["dara-animechat.de"],
	},
	plugins: [tailwindcss(), sveltekit()]
});
