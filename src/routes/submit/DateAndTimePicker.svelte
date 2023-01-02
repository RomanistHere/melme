<script>
	import DatePicker from "$lib/components/ui/DatePicker.svelte";
	import TimePicker from "$lib/components/ui/TimePicker.svelte";

	import { generateRandomString } from "$lib/utils/index.js";

	export let title;
	export let externalError;

	let number = [0];

	$: isSingleTimeRemaining = number.length === 1;

	const increaseNumber = () => {
		number = [...number, generateRandomString()];
	};

	const removeNumber = i => {
		number = number.filter(item => item !== i);
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

<ul>
	{#each number as i, count (i)}
		<li class="flex flex-wrap items-end">
			<DatePicker
				title=""
				name="date_{i}"
			/>

			<TimePicker
				title=""
				class="ml-2"
				name="time_{i}"
			/>

			{#if !isSingleTimeRemaining}
				<button
					class="ml-2 underline text-xs"
					on:click|preventDefault={() => {
						removeNumber(i);
					}}
				>
					remove
				</button>
			{/if}
		</li>
	{/each}
</ul>

<button
	class="text-sm underline mt-2 mb-6 text-indigo-700"
	on:click|preventDefault={increaseNumber}
>
	Add another time
</button>
