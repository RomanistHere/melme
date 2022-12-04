<script>
	import { enhance } from "$app/forms";

	import LikeButton from "$lib/components/ui/LikeButton.svelte";
	import PrimaryButton from "$lib/components/ui/PrimaryButton.svelte";
	import GeoPin from "$lib/components/icons/GeoPin.svelte";
	import Star from "$lib/components/icons/Star.svelte";
	import Separator from "$lib/components/icons/Separator.svelte";
	import PeopleComing from "$lib/components/ui/PeopleComing.svelte";
	import ArrowLeft from "$lib/components/icons/ArrowLeft.svelte";

	import { truncateString } from "$lib/utils/index.js";
	import { userState } from "$lib/stores/localStorage.js";

	export let data;

	$: ({
		slug,
		title,
		description,
		address,
		imgSrc,
		price,
		date,
		time,
		duration,
		categories,
		isFree,
		upVotes,
		hostName,
		linkToEvent,
		duration,
		registrationLink,
		requirements,
		isRegistrationNeeded,
	} = data);

	$: isLiked = $userState?.likedEvents?.includes(slug);
	$: isComing = $userState?.comingEvents?.includes(slug);
	let areYouGoingText = true;

	const hostRating = "0.0";

	const handlePrimaryButtonClick = () => {
		if (isComing) {
			return false;
		}

		userState.update(currentState => {
			if (!currentState) {
				return {
					comingEvents: [slug],
				};
			}

			const { comingEvents } = currentState;

			if (!comingEvents || comingEvents.length === 0) {
				return {
					...currentState,
					comingEvents: [slug],
				};
			} else if (
				comingEvents.length > 0 &&
				!comingEvents.includes(slug)
			) {
				return {
					...currentState,
					comingEvents: [...comingEvents, slug],
				};
			}
		});

		upVotes = upVotes + 1;
		areYouGoingText = false;
	};

	const handleLikeClickButton = e => {
		e.preventDefault();
		isLiked = !isLiked;
		userState.update(currentState => {
			if (!currentState) {
				return {
					likedEvents: [slug],
				};
			}

			const { likedEvents } = currentState;

			if (!likedEvents || likedEvents.length === 0) {
				return {
					...currentState,
					likedEvents: [slug],
				};
			} else if (likedEvents.includes(slug)) {
				return {
					...currentState,
					likedEvents: likedEvents.filter(i => i !== slug),
				};
			} else {
				return {
					...currentState,
					likedEvents: [...likedEvents, slug],
				};
			}
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

<svelte:head>
	<title>melme: {title}</title>
</svelte:head>

<div class="-m-4 bg-white">
	<a
		href="/"
		class="p-3 block"
	>
		<ArrowLeft />
	</a>
	<div
		class="relative h-64 bg-center bg-cover"
		style="background-image: url('{imgSrc}')"
	>
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
		<div class="relative h-14 w-full -mt-2 mb-2">
			{#if hostName}
				<div
					class="absolute text-white text-xs font-bold top-3 left-0 flex items-center"
				>
					<span
						class="w-7 h-7 rounded-full bg-stone-500 block mr-2"
					/>
					<div>
						<p class="text-stone-500">
							{truncateString(hostName, 40)}
						</p>
						<p class="flex">
							<Star
								class="fill-stone-500"
								fill={null}
							/>
							<span
								class="block ml-1 -mt-px text-stone-500"
							>
								{hostRating}
								<span class="text-xs text-black font-light">
									[in development]
								</span>
							</span>
						</p>
					</div>
				</div>
			{/if}
			<LikeButton
				class="top-1 right-0 p-2"
				on:click={handleLikeClickButton}
				isActive={isLiked}
			/>
		</div>
		<h2 class="font-medium text-xl mb-2">
			{title}
		</h2>
		<p class="opacity-30 flex items-center text-sm">
			<GeoPin />
			<a
				class="mx-1 underline truncate"
				href="https://maps.google.com/?q={address}"
				target="_blank"
				rel="noreferrer"
			>
				{address}
			</a>
		</p>
		<p class="opacity-30 flex items-center mb-4 text-sm">
			<span>{getDateHumanFormat(date)}</span>
			<Separator />
			<span>{time}</span>
			<Separator />
			<span>{duration}</span>
		</p>
		<ul class="-mx-1 mb-6">
			{#if isRegistrationNeeded}
				<li
					class="text-xs bg-gray-100 inline-block rounded-2xl py-1 px-2 m-1 text-stone-500 capitalize"
				>
					Registration needed
				</li>
			{/if}
			{#each categories as category}
				<li
					class="text-xs bg-gray-100 inline-block rounded-2xl py-1 px-2 m-1 text-stone-500 capitalize"
				>
					{category}
				</li>
			{/each}
		</ul>
		<PeopleComing
			number={upVotes}
			isAdditionalText={isComing ? null : areYouGoingText}
		/>
		<form
			action="?/increaseUpvote"
			method="POST"
			use:enhance={handlePrimaryButtonClick}
		>
			<PrimaryButton
				title={isComing ? "You are going 🎉" : "I'm going"}
				class="mb-8 mt-2"
				disabled={isComing}
			/>
		</form>
		<p class="my-4">
			Website: <a
				href={linkToEvent}
				class="underline"
			>
				{truncateString(linkToEvent, 60)}
			</a>
		</p>
		<p class="my-4">
			{description}
		</p>
		{#if requirements}
			<p class="my-4">
				{requirements}
			</p>
		{/if}
		{#if isRegistrationNeeded && registrationLink}
			Link to registration: <a
				href={registrationLink}
				class="underline"
			>
				{truncateString(registrationLink, 20)}
			</a>
		{/if}
	</div>
</div>
