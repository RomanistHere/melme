<script>
	import { timeOptionsToMinutes } from "$lib/config.js";

	let customClass = "";
	export { customClass as class };
	export let time;
	export let date;
	export let duration;

	const strToMins = t => {
		const arr = t.split(":");
		return Number(arr[0]) * 60 + Number(arr[1]);
	};

	// const minsToStr = t =>
	// 	Math.trunc(t / 60) + ":" + ("00" + (t % 60)).slice(-2);

	// todo: https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
	const today = new Date().toISOString().split("T")[0];
	const currentTime24 = new Date().toLocaleTimeString(
		"en-US",
		{ hour: "numeric", hour12: false, minute: "numeric" }
	);
	const timeSubtraction =
		strToMins(currentTime24) - strToMins(time);
	const absTime = Math.abs(timeSubtraction);

	const eventDuration = timeOptionsToMinutes[duration];
	$: isEventToday = today === date;
	$: isEnded =
		isEventToday && timeSubtraction > eventDuration;
	$: isLive =
		isEventToday && timeSubtraction >= 0 && !isEnded;
	$: isStartingSoon =
		isEventToday && !isLive && absTime < 30;
	$: isBadge = isLive || isStartingSoon || isEnded;
</script>

{#if isBadge}
	<span
		class="text-sm py-0.5 px-2 rounded-xl {customClass} bg-white"
		class:bg-orange-500={isLive}
		class:text-white={isLive || isEnded}
		class:bg-stone-400={isEnded}
	>
		{#if isLive}
			Live
		{:else if isStartingSoon}
			Starting soon
		{:else if isEnded}
			Likely ended
		{/if}
	</span>
{/if}
