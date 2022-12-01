<script>
	let customClass = "";
	export { customClass as class };
	export let options = [];
	export let id;
	export let title;

	let group;

	const handleChange = e => {
		console.log(e);
		group = e.target.value;
	};
</script>

<div class={customClass}>
	<label class="lowercase text-sm block mb-2">
		{title}
	</label>

	{#each options as option}
		<input
			id="id_{option}"
			name={id}
			type="radio"
			class="w-0 h-0 opacity-0 absolute"
			value={option}
			bind:group
			on:change={handleChange}
		/>
		<label
			for="id_{option}"
			class="flex items-center cursor-pointer my-1"
		>
			<span
				class="w-5 h-5 inline-block rounded-md border border-text transition-colors shrink-0 mr-3"
			/>
			{option}
		</label>
	{/each}
</div>

<style>
	input[type="radio"]:checked + label span {
		background-color: mediumvioletred;
		box-shadow: 0px 0px 0px 2px white inset;
	}
	input[type="radio"]:checked + label {
		color: mediumvioletred;
	}
</style>
