<script>
	// import SwitchToggler from "./SwitchToggler.svelte";

	let customClass = "";
	export { customClass as class };
	export let title;
	export let name;
	export let id = "event-date-1";
	// export let secondId = "event-date-2";
	export let isLimitedByToday = true;

	const getCurrentDay = () => {
		const yourDate = new Date();
		const offset = yourDate.getTimezoneOffset();
		const adjustedDate = new Date(yourDate.getTime() - offset * 60 * 1000);
		return adjustedDate.toISOString().split("T")[0];
	};

	const curDay = getCurrentDay();
	// let toggleInputRef = null;
	// let isSingleDay = true;

	// const handleToggleClick = () => {
	// 	isSingleDay = toggleInputRef.checked;
	// };
</script>

<div class={customClass}>
	<label
		class="lowercase text-sm"
		for={id}
	>
		{title}
	</label>

	<div class="mt-2 flex">
		<!--		<SwitchToggler-->
		<!--			on:click={handleToggleClick}-->
		<!--			bind:toggleInputRef-->
		<!--			optionOneText="Single day"-->
		<!--			optionTwoText="Range of days"-->
		<!--		/>-->

		<input
			type="date"
			class="input-border"
			{id}
			{name}
			min={isLimitedByToday ? curDay : undefined}
		/>

		<!--{#if !isSingleDay}-->
		<!--	<div class="bg-amber-500 text-4xl">-</div>-->
		<!--	<input-->
		<!--		type="date"-->
		<!--		class="bg-amber-500 px-2"-->
		<!--		id={secondId}-->
		<!--		min={isLimitedByToday ? curDay : undefined}-->
		<!--	/>-->
		<!--{/if}-->
	</div>
</div>

<style>
	input {
		-webkit-appearance: none;
	}
</style>
