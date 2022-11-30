<script>
	export let data;

	$: ({ events } = data);
</script>

<ul class="p-10">
	{#each events as event}
		<li class="p-4 my-2 border border-2">
			<p>
				{event.title}
			</p>
			<p>
				{event.description}
			</p>
			<p>
				{event.address}
			</p>
		</li>
	{/each}
</ul>