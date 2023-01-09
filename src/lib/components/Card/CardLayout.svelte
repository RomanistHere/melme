<script>
	import LikeButton from "$lib/components/ui/LikeButton.svelte";
	import Star from "$lib/components/icons/Star.svelte";
	import Badges from "./Badges.svelte";

	import { truncateString } from "$lib/utils/index.js";
	import { userState } from "$lib/stores/localStorage.js";

	export let hostName;
	export let imgSrc;
	export let slug;
	export let date;
	export let duration;
	export let isFree;
	export let price;
	export let isSmall;
	export let isInstanceOfDate;
	export let type;

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
</script>

<div
	class="relative h-64 bg-center bg-cover"
	class:h-40={isSmall}
	style="background-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)), url('{imgSrc}')"
>
	<div
		class="absolute text-white text-xs font-bold top-3 left-3 flex items-center"
	>
		<span class="w-7 h-7 rounded-full bg-white block mr-2" />
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
	<Badges
		{date}
		{duration}
		{isFree}
		{price}
		{isInstanceOfDate}
		{type}
	/>
</div>
