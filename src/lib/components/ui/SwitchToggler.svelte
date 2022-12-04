<script>
	let customClass = "";
	export { customClass as class };
	export let toggleInputRef;
	export let optionOneText;
	export let optionTwoText;
	export let name;
	export let checked = true;
</script>

<label
	class="relative inline-flex rounded-xl overflow-hidden cursor-pointer {customClass}"
	on:click
>
	<input
		type="checkbox"
		class="opacity-0 w-0 h-0 absolute"
		{name}
		{checked}
		bind:this={toggleInputRef}
	/>
	<span class="block p-2 px-3 text-white transition-colors">
		{optionOneText}
	</span>
	<span class="block p-2 px-3 text-white transition-colors">
		{optionTwoText}
	</span>
</label>

<style>
	input:checked + span {
		background-color: #4338ca;
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
		background-color: #4338ca;
		opacity: 1;
	}
</style>
