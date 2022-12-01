<script>
	let customClass = "";
	export { customClass as class };
	export let options = [];
	export let id;
	export let title;
</script>

<div class={customClass}>
	<label
		class="lowercase text-sm block mb-2"
		for={id}
	>
		{title}
	</label>

	<select
		id=""
		class="p-2"
	>
		{#each options as value}
			<option {value}>{value}</option>
		{/each}
	</select>
</div>
