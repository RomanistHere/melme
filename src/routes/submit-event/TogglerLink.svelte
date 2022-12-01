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

	let toggleInputRef = null;
	let isNeedToRegister = false;

	const handleToggleClick = () => {
		isNeedToRegister = toggleInputRef.checked;
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
		checked={false}
		class="mb-4"
	/>

	{#if isNeedToRegister}
		<Input
			title={secondTitle}
			id={inputId}
			maxlength={128}
			placeholder={inputPlaceholder}
			class="mb-4"
		/>
	{/if}
</div>
