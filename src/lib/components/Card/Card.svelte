<script>
	import GeoPin from "$lib/components/icons/GeoPin.svelte";
	import ArrowLeft from "$lib/components/icons/ArrowLeft.svelte";
	import Separator from "$lib/components/icons/Separator.svelte";
	import PeopleComing from "$lib/components/ui/PeopleComing.svelte";
	import CardLayout from "$lib/components/Card/CardLayout.svelte";

	import {
		truncateString,
		getDateHumanFormat,
		getTimeHumanFormat,
		getClosestDateToNow,
	} from "$lib/utils/index.js";

	export let slug;
	export let title;
	export let description;
	export let addresses;
	export let imgSrc;
	export let price;
	export let times;
	export let categories;
	export let isFree;
	export let upVotes;
	export let hostName;
	export let duration;
	export let isRegistrationNeeded;
	export let isTimeStrings = true;

	const getTodayTimes = arr => {
		if (!arr)
			return null;

		const dayOfWeek = new Date().getUTCDay();
		return arr.filter(({ weekday }) => weekday === dayOfWeek)[0];
	};

	const getFromTime = ({ startHour, startMinute }) =>
		`from ${startHour.toString().padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}`;

	const getToTime = ({ endHour, endMinute }) =>
		`till ${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`;

	$: date = isTimeStrings ? getClosestDateToNow(times) : getTodayTimes(times);
	$: info1 = isTimeStrings ? getDateHumanFormat(date) : getFromTime(date);
	$: info2 = isTimeStrings ? getTimeHumanFormat(date) : getToTime(date);
</script>

<div class="my-6 bg-white rounded-2xl overflow-hidden">
	<CardLayout
		{hostName}
		{slug}
		{imgSrc}
		{duration}
		{isFree}
		{price}
		{date}
		{isTimeStrings}
	/>

	<div class="p-6">
		<h2 class="font-medium text-xl">
			{title}
		</h2>
		<p class="opacity-30 flex items-center mb-4 text-sm">
			<GeoPin />
			<span class="ml-1">
				{#if addresses.length > 1}
					Multiple locations
				{:else}
					{truncateString(addresses[0], 11)}
				{/if}
			</span>
			<Separator />
			<span>
				{info1}
			</span>
			<Separator />
			<span>
				{info2}
			</span>
		</p>
		<p class="mb-2">
			{truncateString(description, 74)}
		</p>
		<ul class="-mx-1 mb-4">
			{#each categories as category}
				<li
					class="text-xs bg-gray-100 inline-block rounded-2xl py-1 px-2 m-1 text-stone-500 capitalize"
				>
					{category}
				</li>
			{/each}
			{#if isRegistrationNeeded}
				<li
					class="text-xs bg-gray-100 inline-block rounded-2xl py-1 px-2 m-1 text-stone-500 capitalize"
				>
					Registration needed
				</li>
			{/if}
		</ul>
		<div class="flex justify-between">
			<PeopleComing number={upVotes} />
			<a
				class="font-medium text-indigo-600 flex items-center"
				href="attractions/{slug}"
			>
				<span class="mr-1">Learn more</span>
				<div class="rotate-180 scale-90">
					<ArrowLeft
						fill={null}
						class="fill-indigo-600"
					/>
				</div>
			</a>
		</div>
	</div>
</div>
