<script>
	export let note;
</script>

<header class="my-4">
	<h1 class="text-2xl">
		Free events in Dubai
		{#if note}
			<span class="text-xl text-stone-700">{note}</span>
		{/if}
	</h1>
</header>
