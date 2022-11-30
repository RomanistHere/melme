<script>
	import Card from "$lib/components/Card.svelte";

	// data comes from export in +page.server.js
	export let data;

	// this is a Svelte way to destructure property and keep it reactive
	// basically it's equals to `const { events } = data`, where `events` will be updated when `data` is
	$: ({ events } = data);
</script>

<ul class="p-10">
	{#each events as event}
		<li>
			<Card {...event} />
		</li>
	{/each}
</ul>
