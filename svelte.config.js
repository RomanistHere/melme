import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$db: "./src/db",
			$server: "./src/server",
		},
	},
	preprocess: [
		preprocess({
			postcss: true,
		}),
	],
};

export default config;
