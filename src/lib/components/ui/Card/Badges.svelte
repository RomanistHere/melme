<script>
	import MarqueeAnimation from "$lib/components/ui/MarqueeAnimation.svelte";

	import { timeOptionsToMinutes } from "$lib/config.js";
	import { getToday, getTimeHumanFormat } from "$lib/utils/index.js";

	export let date;
	export let duration;
	export let isFree;
	export let price;

	const strToMins = t => {
		const arr = t.split(":");
		return Number(arr[0]) * 60 + Number(arr[1]);
	};

	// const minsToStr = t =>
	// 	Math.trunc(t / 60) + ":" + ("00" + (t % 60)).slice(-2);

	const today = getToday();
	const tomorrow = new Date(new Date().getTime() + 86400000).toLocaleDateString("en-CA");

	$: console.log(date);
	$: console.log(new Date());
	$: console.log(timeSubtraction);

	const timeSubtraction = strToMins(getTimeHumanFormat(new Date())) - strToMins(getTimeHumanFormat(date));
	const absTime = Math.abs(timeSubtraction);
	const eventDuration = timeOptionsToMinutes[duration];
	const isEventTomorrow = tomorrow === date;
	const isEventToday = today === date;

	$: isEnded = isEventToday && timeSubtraction > eventDuration;
	$: isLive = isEventToday && timeSubtraction >= 0 && !isEnded;
	$: isStartingSoon = isEventToday && !isLive && absTime < 30;
	$: isBadge =
		!isLive && (isStartingSoon || isEnded || isEventToday || isEventTomorrow);
</script>

{#if isBadge}
	<span
		class="text-sm py-0.5 px-2 rounded-xl absolute left-3 bottom-10 bg-white"
		class:bg-orange-500={isLive}
		class:text-white={isLive || isEnded}
		class:bg-stone-400={isEnded}
	>
		{#if isStartingSoon}
			Starting soon
		{:else if isEnded}
			Likely ended
		{:else if isEventToday}
			Today
		{:else if isEventTomorrow}
			Tomorrow
		{/if}
	</span>
{/if}

<span
	class="absolute text-sm py-0.5 px-2 rounded-xl bottom-10 left-3 bg-white"
	class:bottom-2={!isLive}
>
	{#if isFree}
		Free
	{:else}
		{price}
	{/if}
</span>

{#if isLive}
	<MarqueeAnimation class="absolute bottom-1" />
{/if}
