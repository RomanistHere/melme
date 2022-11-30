<script>
	export let data;

	$: ({ events } = data);
	$: console.log(events);
</script>

<ul>
	{#each events as event}
		<li>
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