<script>
	import { createEventDispatcher } from "svelte";

	let customClass = "";
	export { customClass as class };

	export let title;
	export let id = "";
	export let name;
	export let maxlength = 512;
	export let placeholder = "";
	export let externalError = false;

	let ref;
	let remainingCommentLength = maxlength;
	$: isRemainingCharsWarning = remainingCommentLength / maxlength < 0.05;

	const dispatch = createEventDispatcher();

	const handleInput = e => {
		const { value } = e.target;
		remainingCommentLength = maxlength - value.length;
		dispatch("input", value);
	};

	export const focus = () => {
		ref?.focus();
	};
</script>

<div class={customClass}>
	<div class="relative">
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

		<textarea
			class="w-full h-40 mt-2 text-base input-border"
			class:border-red-500={externalError}
			class:hover:border-red-500={externalError}
			{placeholder}
			{maxlength}
			{id}
			{name}
			on:input={handleInput}
			bind:this={ref}
		/>
	</div>
	<p class:text-orange-400={isRemainingCharsWarning}>
		{remainingCommentLength}
	</p>
</div>
