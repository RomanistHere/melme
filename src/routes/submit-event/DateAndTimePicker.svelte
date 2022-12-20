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

	const removeTime = i => {
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

<ul class="mb-4">
	{#each number as i, count (i)}
		<li class="flex flex-wrap">
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
				class="input-border bg-white mt-2 mx-2 font-bold"
				on:click|preventDefault={() => {
					removeTime(i);
				}}
				disabled={isSingleTimeRemaining}
				class:opacity-30={isSingleTimeRemaining}
			>
				-
			</button>

			{#if count === number.length - 1}
				<button
					class="input-border bg-white mt-2"
					on:click|preventDefault={increaseNumber}
				>
					Add another time
				</button>
			{/if}
		</li>
	{/each}
</ul>
