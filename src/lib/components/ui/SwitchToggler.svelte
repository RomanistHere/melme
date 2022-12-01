<script>
	let customClass = "";
	export { customClass as class };
	export let toggleInputRef;
	export let optionOneText;
	export let optionTwoText;
	export let checked = true;
</script>

<label class="relative flex mr-4 {customClass}" on:click>
	<input
		type="checkbox"
		class="opacity-0 w-0 h-0"
		{checked}
		bind:this={toggleInputRef}
	/>
	<span class="block p-2 text-white">
		{optionOneText}
	</span>
	<span class="block p-2 text-white">
		{optionTwoText}
	</span>
</label>

<style>
	input:checked + span {
		background-color: mediumvioletred;
		opacity: 1;
	}

	input:checked + span + span {
		opacity: 0.4;
		background-color: gray;
	}

	input + span {
		opacity: 0.4;
		background-color: gray;
	}

	input + span + span {
		background-color: mediumvioletred;
		opacity: 1;
	}
</style>
