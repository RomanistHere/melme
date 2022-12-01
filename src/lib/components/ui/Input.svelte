<script>
	let customClass = "";
	export { customClass as class };

	export let title;
	export let type = "text";
	export let id = "";
	export let autofocus = false;
	export let maxlength = null;
	export let placeholder = null;
	export let value = "";
	export let isInputValid = true;
	export let externalError = false;

	let isInputActive = false;
	let hasTypingStarted = false;
	let ref;

	export const focus = () =>
		ref?.focus();

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

	$: isError = (!isInputValid && !isInputActive && value !== "") || externalError;
	$: isValid = isInputValid && hasTypingStarted && !isInputActive && !externalError;
</script>

<div class="mt-2 {customClass}">
	<label
			class="lowercase text-sm"
			class:text-txt_danger={isError}
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
			class="bg-bg_gray border-bg_gray border rounded-lg p-3 px-6 w-full focus:outline-0 transition-colors hover:border-stroke focus:border-main focus:bg-white"
			class:border-txt_danger={isError}
			class:hover:border-txt_danger={isError}
			class:pr-12={type === "password"}
			autocomplete={id}
			{ id }
			{ autofocus }
			{ maxlength }
			{ placeholder }
			{ type }
			on:blur={onBlur}
			on:input={onInput}
			bind:this={ref}
		>
	</div>
</div>

<style>
	.border-bg_gray:focus {
		border-color: var(--main);
	}
</style>