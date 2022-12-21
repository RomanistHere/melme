<script>
	import Input from "$lib/components/ui/Input.svelte";

	import { generateRandomString } from "$lib/utils/index.js";

	export let externalError = null;

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
		*Address
	{/if}
</p>

<ul>
	{#each number as i, count (i)}
		<li class="flex -my-2 items-end">
			<Input
				title=""
				id="event-address"
				name="address_{i}"
				maxlength={128}
				placeholder="Type 'not specified' if it's unknown."
				class="w-full"
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
	class="underline mb-6 mt-4 text-sm"
	on:click|preventDefault={increaseNumber}
>
	Add another location
</button>
