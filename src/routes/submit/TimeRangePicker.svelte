<script>
	import TimePicker from "$lib/components/ui/TimePicker.svelte";
	import RadioButtons from "$lib/components/ui/RadioButtons.svelte";

	export let title;
	export let externalError;

	const optionsToArr = {
		"Every day the same time": ["Mon-Sun"],
		"Mon-Thu and Fri-Sun": ["Mon-Thu", "Fri-Sun"],
		"Mon-Thu, weekend separately": ["Mon-Thu", "Fri", "Sat", "Sun"],
		"Every day separately": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	};
	const options = Object.keys(optionsToArr);

	let val = options[0];
	$: days = optionsToArr[val];
</script>

<RadioButtons
	title="*Is visiting time different during the week?"
	id="time-difference"
	{options}
	class="mb-6"
	bind:group={val}
/>

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

<ul class="mb-6">
	{#each days as day, count (day)}
		<li class="flex flex-wrap items-end">
			<span class="min-w-[5rem] underline">
				{day}:
			</span>
			from
			<TimePicker
				title=""
				class="mx-2"
				name="time_from_{day}"
			/>
			till
			<TimePicker
				title=""
				class="mx-2"
				name="time_to_{day}"
			/>
		</li>
	{/each}
</ul>