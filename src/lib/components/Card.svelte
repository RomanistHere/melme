<script>
	import LikeButton from "$lib/components/ui/LikeButton.svelte";
	import TimeRelatedBadge from "$lib/components/ui/TimeRelatedBadge.svelte";
	import GeoPin from "$lib/components/icons/GeoPin.svelte";
	import Star from "$lib/components/icons/Star.svelte";
	import ArrowLeft from "$lib/components/icons/ArrowLeft.svelte";
	import Separator from "$lib/components/icons/Separator.svelte";

	import { truncateString } from "$lib/utils/index.js";
	import { userState } from "$lib/stores/localStorage.js";
	import PeopleComing from "$lib/components/ui/PeopleComing.svelte";

	export let slug;
	export let title;
	export let description;
	export let address;
	export let imgSrc;
	export let price;
	export let date;
	export let time;
	export let categories;
	// export let location;
	export let isApproved;
	export let isFree;
	export let upVotes;
	export let downVotes;
	export let hostName;
	export let linkToEvent;
	export let duration;
	export let registrationLink;
	export let requirements;
	export let isRegistrationNeeded;

	$: isLiked = $userState?.likedEvents?.includes(slug);

	const hostRating = "0.0";

	const handleLikeClickButton = e => {
		e.preventDefault();
		isLiked = !isLiked;
		userState.update(currentState => {
			if (!currentState) return { likedEvents: [slug] };
			const { likedEvents } = currentState;
			if (!likedEvents || likedEvents.length === 0)
				return { ...currentState, likedEvents: [slug] };
			else if (likedEvents.includes(slug))
				return {
					...currentState,
					likedEvents: likedEvents.filter(i => i !== slug),
				};
			else
				return {
					...currentState,
					likedEvents: [...likedEvents, slug],
				};
		});
	};

	const getDateHumanFormat = dateStr => {
		const date = new Date(dateStr);
		const options = {
			month: "short",
			day: "numeric",
		};

		return date.toLocaleDateString("en-UK", options);
	};
</script>

<div class="my-6 bg-white rounded-2xl overflow-hidden">
	<div
		class="relative h-64 bg-center bg-cover"
		style="background-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)), url('{imgSrc}')"
	>
		<div
			class="absolute text-white text-xs font-bold top-3 left-3 flex items-center"
		>
			<span
				class="w-7 h-7 rounded-full bg-white block mr-2"
			/>
			<div>
				<p class="text-shadow">
					{truncateString(hostName || "unknown", 20)}
				</p>
				<p class="flex">
					<Star />
					<span class="block ml-1 -mt-px text-shadow">
						{hostRating}
					</span>
				</p>
			</div>
		</div>
		<LikeButton
			class="top-1 right-1 p-2"
			on:click={handleLikeClickButton}
			isActive={isLiked}
		/>
		<TimeRelatedBadge
			{time}
			{date}
			{duration}
			class="absolute left-3 bottom-10"
		/>
		<span
			class="absolute text-sm py-0.5 px-2 rounded-xl bottom-3 left-3 bg-white"
		>
			{#if isFree}
				Free
			{:else}
				{price}
			{/if}
		</span>
	</div>
	<div class="p-6">
		<h2 class="font-medium text-xl">
			{title}
		</h2>
		<p class="opacity-30 flex items-center mb-4 text-sm">
			<GeoPin />
			<span class="ml-1">
				{truncateString(address, 11)}
			</span>
			<Separator />
			<span>{getDateHumanFormat(date)}</span>
			<Separator />
			<span>{time}</span>
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
				href="events/{slug}"
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
