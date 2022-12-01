<script>
	export let title;
	export let list = [];
	export let pickedList = [];

	const handelCategoryUpdate = item => {
		if (pickedList.includes(item))
			pickedList = pickedList.filter(i => item !== i);
		else pickedList = [...pickedList, item];
	};
</script>

<p class="lowercase text-sm mb-2">
	{title}
</p>

<div class="-mx-1">
	{#each list as item}
		<button
			on:click|preventDefault={() =>
				handelCategoryUpdate(item)}
			class="m-1 p-2 rounded-lg input-border"
			class:bg-amber-500={pickedList.includes(item)}
		>
			{item}
		</button>
	{/each}
</div>
