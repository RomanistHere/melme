<script>
	let customClass = "";
	export { customClass as class };
	export let title;
	export let id = "event-time";
	export let name;
</script>

<div class={customClass}>
	<label
		class="lowercase text-sm"
		for={id}
	>
		{title}
	</label>

	<div class="mt-2 flex">
		<input
			type="time"
			class="input-border"
			{id}
			{name}
			on:input
		/>
	</div>
</div>

<style>
	input {
		-webkit-appearance: none;
	}
</style>
