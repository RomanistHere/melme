import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$db: "./src/db",
			$server: "./src/server",
		},
	},
	extensions: [".svelte", ".md", ".svx"],
	preprocess: [
		preprocess({
			postcss: true,
		}),
		mdsvex({
			extensions: [".md", ".svx"],
		}),
	],
};

export default config;
