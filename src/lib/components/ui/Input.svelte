<script>
	let customClass = "";
	export { customClass as class };

	export let title;
	export let type = "text";
	export let id = "";
	export let name;
	export let autofocus = false;
	export let maxlength = null;
	export let placeholder = null;
	export let value = "";
	export let isInputValid = true;
	export let externalError = false;

	let isInputActive = false;
	let hasTypingStarted = false;
	let ref;

	export const focus = () => ref?.focus();

	const onBlur = e => {
		isInputActive = false;
		value = e.currentTarget.value;
	};

	const onInput = e => {
		isInputValid = false;
		hasTypingStarted = true;
		isInputActive = true;
		value = e.currentTarget.value;
	};

	$: isError =
		(!isInputValid && !isInputActive && value !== "") || externalError;
</script>

<div class="mt-2 {customClass}">
	<label
		class="lowercase text-sm"
		class:text-red-500={externalError}
		for={id}
	>
		{#if externalError}
			{externalError}
		{:else}
			{title}
		{/if}
	</label>

	<div class="relative mt-2">
		<!-- svelte-ignore a11y-autofocus -->
		<input
			class="px-6 w-full input-border"
			class:border-red-500={externalError}
			class:hover:border-red-500={externalError}
			class:pr-12={type === "password"}
			autocomplete={id}
			{name}
			{id}
			{autofocus}
			{maxlength}
			{placeholder}
			{type}
			on:blur={onBlur}
			on:input={onInput}
			bind:this={ref}
		/>
	</div>
</div>
