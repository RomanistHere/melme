<script>
	import Seo from "$lib/components/Seo.svelte";
	import ArrowLeft from "$lib/components/icons/ArrowLeft.svelte";

	import { handleClickBack } from "$lib/utils/index.js";

	export let data;
</script>

<Seo
	title="melme | {data.title}"
	description={data.description}
/>

<a
	href="/"
	on:click|preventDefault={handleClickBack}
	class="py-3 mt-4 block"
>
	<ArrowLeft />
</a>

<article class="article">
	<h1 class="text-4xl mt-2 mb-6">
		{data.title}
	</h1>

	<svelte:component this={data.content} />

	<p class="italic mb-2 text-right">
		Published: {data.date}
	</p>
</article>
