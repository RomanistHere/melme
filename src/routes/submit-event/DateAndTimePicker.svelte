<script>
	import DatePicker from "$lib/components/ui/DatePicker.svelte";
	import TimePicker from "$lib/components/ui/TimePicker.svelte";

	export let title;
	export let externalError;

	let number = [""];

	const increaseNumber = () => {
		number = [ ...number, "" ];
	};
</script>

<p
	class="lowercase text-sm"
	class:text-red-500={externalError}
>
	{#if externalError}
		{externalError}
	{:else}
		{title}
	{/if}
</p>

<ul class="mb-4">
	{#each number as key, i}
		<li class="flex">
			<DatePicker
				title=""
				name="date_{i}"
			/>

			<TimePicker
				title=""
				class="ml-2"
				name="time_{i}"
			/>

			<button
				class="input-border bg-white mt-2 ml-2"
				on:click|preventDefault={increaseNumber}
			>
				Add another time
			</button>
		</li>
	{/each}
</ul>