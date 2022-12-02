<script>
	import LikeButton from "$lib/components/ui/LikeButton.svelte";
	import GeoPin from "$lib/components/icons/GeoPin.svelte";
	import Star from "$lib/components/icons/Star.svelte";

	import { truncateString } from "$lib/utils/index.js";
	import { userState } from "$lib/stores/index.js";

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

	let isLiked = $userState?.likedEvents?.includes(slug);

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

<div
	class="block my-6 bg-white rounded-2xl overflow-hidden"
>
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
					{truncateString(hostName, 20)}
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
			<span class="mx-1">
				{truncateString(address, 11)}
			</span>
			<svg
				width="4"
				height="3"
				viewBox="0 0 4 3"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					cx="2"
					cy="1.5"
					r="1.5"
					fill="#686868"
				/>
			</svg>
			<span class="mx-1">{getDateHumanFormat(date)}</span>
			<svg
				width="4"
				height="3"
				viewBox="0 0 4 3"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					cx="2"
					cy="1.5"
					r="1.5"
					fill="#686868"
				/>
			</svg>
			<span class="mx-1">{time}</span>
		</p>
		<p class="mb-4">
			{truncateString(description, 80)}
		</p>
		<div class="flex justify-between">
			{#if upVotes !== 0}
				<p class="font-medium text-stone-500">
					{#if upVotes === 1}
						{upVotes} is going
					{:else}
						{upVotes} are going
					{/if}
				</p>
			{/if}
			<a
				class="font-medium text-cyan-400"
				href={slug}
			>
				Learn more ->
			</a>
		</div>
	</div>
</div>
