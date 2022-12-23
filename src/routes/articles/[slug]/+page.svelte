<script>
	import Seo from "$lib/components/Seo.svelte";

	export let data;
</script>

<Seo
	title="melme | {data.title}"
	description={data.description}
/>

<article class="article">
	<h1 class="text-4xl mt-8 mb-6">
		{data.title}
	</h1>

	<p class="italic mb-2">
		Published: {data.date}
	</p>

	<svelte:component this={data.content} />
</article>

<style :global>
	.article li {
		list-style: square;
	}
</style>