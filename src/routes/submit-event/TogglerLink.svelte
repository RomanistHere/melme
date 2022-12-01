<script>
	import SwitchToggler from "$lib/components/ui/SwitchToggler.svelte";
	import Input from "$lib/components/ui/Input.svelte";

	let customClass = "";
	export { customClass as class };
	export let title;
	export let secondTitle;
	export let optionOneText;
	export let optionTwoText;
	export let inputId;
	export let inputPlaceholder;
	export let name;
	export let inputName;
	export let isInputChecked = false;

	let toggleInputRef = null;
	let isInputChangedChecked = isInputChecked;

	const handleToggleClick = () => {
		isInputChangedChecked = toggleInputRef.checked;
	};
</script>

<div class={customClass}>
	<p class="lowercase text-sm mb-2">
		{title}
	</p>

	<SwitchToggler
		on:click={handleToggleClick}
		bind:toggleInputRef
		{optionOneText}
		{optionTwoText}
		{name}
		checked={isInputChecked}
		class="mb-4"
	/>

	{#if (isInputChecked && !isInputChangedChecked) || (!isInputChecked && isInputChangedChecked)}
		<Input
			title={secondTitle}
			id={inputId}
			name={inputName}
			maxlength={128}
			placeholder={inputPlaceholder}
			class="mb-4"
		/>
	{/if}
</div>
