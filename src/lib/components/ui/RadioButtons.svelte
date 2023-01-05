<script>
	let customClass = "";
	export { customClass as class };
	export let options = [];
	export let id;
	export let name;
	export let title;
	export let group;
	export let disabled = false;

	const handleChange = e => {
		if (disabled)
			return;
		group = e.target.value;
	};
</script>

<div class={customClass}>
	<p class="lowercase text-sm block mb-2">
		{title}
	</p>

	{#each options as option}
		<input
			id="{id}_{option}"
			{name}
			type="radio"
			class="w-0 h-0 opacity-0 absolute"
			value={option}
			{disabled}
			bind:group
			on:change={handleChange}
		/>
		<label
			for="{id}_{option}"
			class="flex items-center cursor-pointer my-1 text-stone-700"
		>
			<span
				class="w-5 h-5 inline-block rounded-md border border-stone-500 border-text transition-colors shrink-0 mr-3"
			/>
			{option}
		</label>
	{/each}
</div>

<style>
	input[type="radio"]:checked + label span {
		background-color: #4338ca;
		box-shadow: 0px 0px 0px 2px white inset;
	}
	input[type="radio"]:checked + label {
		color: #4338ca;
	}
</style>
