<script>
	import { timeOptionsToMinutes } from "$lib/config.js";
	import { getToday } from "$lib/utils/index.js";

	export let date;
	export let duration;
	export let isFree;
	export let price;
	export let isInstanceOfDate;
	export let type;
	export let dateEnd;

	const typesToCaption = {
		"attraction": "Everyday activities",
		"one-time": "One-time opportunity",
		"last-time": "Last chance",
		"repeat": "On repeat",
	};
	const today = getToday();
	const tomorrow = new Date(new Date().getTime() + 86400000).toLocaleDateString(
		"en-CA"
	);

	const timeSubtraction = Math.floor((date - new Date()) / 1000 / 60);
	const eventDuration = timeOptionsToMinutes[duration];
	const isEventTomorrow = tomorrow === date.toLocaleDateString("en-CA");
	const isEventToday = today === date.toLocaleDateString("en-CA");

	$: isEnded = !dateEnd
		? isEventToday && -timeSubtraction > eventDuration
		: Math.floor((dateEnd - new Date()) / 1000 / 60) < 0;
	$: isLive = isEventToday && timeSubtraction <= 0 && !isEnded;
	$: isStartingSoon =
		isEventToday && !isLive && timeSubtraction < 30 && timeSubtraction > 0;
	$: isBadge =
		isLive || isStartingSoon || isEnded || isEventToday || isEventTomorrow;
</script>

{#if isBadge}
	<span
		class="text-sm py-0.5 px-2 rounded-xl absolute left-3 bottom-10 bg-white"
		class:bg-indigo-500={isLive}
		class:text-white={isLive || isEnded}
		class:bg-stone-400={isEnded}
	>
		{#if isStartingSoon}
			Starting soon
		{:else if isEnded}
			{#if isInstanceOfDate}
				Likely ended
			{:else}
				Closed
			{/if}
		{:else if isLive}
			{#if isInstanceOfDate}
				Live
			{:else}
				Open
			{/if}
		{:else if isEventToday}
			Today
		{:else if isEventTomorrow}
			Tomorrow
		{/if}
	</span>
{/if}

<span class="absolute text-sm py-0.5 px-2 rounded-xl bottom-2 left-3 bg-white">
	{#if isFree}
		Free
	{:else}
		{price}
	{/if}
</span>

{#if type}
	<span
		class="bg-white rounded-full px-2 py-0.5 text-sm absolute right-3 bottom-2 inline-block"
		class:bg-orange-400={type === "one-time"}
		class:text-white={type === "one-time"}
	>
		{typesToCaption[type]}
	</span>
{/if}
