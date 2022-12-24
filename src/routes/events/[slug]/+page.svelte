<script>
	import { enhance } from "$app/forms";

	import LikeButton from "$lib/components/ui/LikeButton.svelte";
	import PrimaryButton from "$lib/components/ui/PrimaryButton.svelte";
	import Seo from "$lib/components/Seo.svelte";
	import GeoPin from "$lib/components/icons/GeoPin.svelte";
	import Star from "$lib/components/icons/Star.svelte";
	import Separator from "$lib/components/icons/Separator.svelte";
	import PeopleComing from "$lib/components/ui/PeopleComing.svelte";
	import ArrowLeft from "$lib/components/icons/ArrowLeft.svelte";
	import SecondaryButton from "$lib/components/ui/SecondaryButton.svelte";
	import NotificationPopup from "./NotificationPopup.svelte";

	import {
		truncateString,
		handleClickBack,
		getClosestDateToNow,
		getTimeHumanFormat,
		getDateHumanFormat,
		convertTimesToUTC,
		convertUTCToLocalDateIgnoringTimezone,
		getToday,
		openOverlay,
	} from "$lib/utils/index.js";
	import { userState } from "$lib/stores/localStorage.js";

	export let data;

	const today = convertUTCToLocalDateIgnoringTimezone(new Date(getToday()));

	$: ({
		slug,
		title,
		description,
		addresses,
		imgSrc,
		price,
		times,
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
		vapidPublicKey,
	} = data);

	$: isLiked = $userState?.likedEvents?.includes(slug);
	$: isComing = $userState?.comingEvents?.includes(slug);
	$: isReminderSet = $userState?.reminderEvents?.includes(slug);
	$: availableTimes = convertTimesToUTC(times);
	$: date = getClosestDateToNow(availableTimes);
	$: humanDate = getDateHumanFormat(date);
	$: humanTime = getTimeHumanFormat(date);
	$: showTimes = false;

	let areYouGoingText = true;

	const hostRating = "0.0";

	const setReminder = () => {
		if (isReminderSet) return false;

		openOverlay("shouldSetNotificationPopup", {
			slug,
			vapidPublicKey,
			date: availableTimes.filter(d => d - new Date() > 0)[0],
		});
	};

	const handlePrimaryButtonClick = () => {
		setReminder();

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
			} else if (comingEvents.length > 0 && !comingEvents.includes(slug)) {
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

	const showTimeSlots = e => {
		e.preventDefault();
		showTimes = !showTimes;
	};

	const initShareProcess = async e => {
		e.preventDefault();
		try {
			await navigator.share({
				url: `melme.io/${slug}`,
				title,
			});
		} catch (err) {
			// eslint-disable-next-line no-alert
			alert(err);
		}
	};
</script>

<Seo
	title={`melme | ${title.toLowerCase()}`}
	{description}
	image={imgSrc}
/>

<div class="-mx-4 bg-white">
	<a
		href="/"
		on:click|preventDefault={handleClickBack}
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
					<span class="w-7 h-7 rounded-full bg-stone-500 block mr-2" />
					<div>
						<p class="text-stone-500">
							{truncateString(hostName, 40)}
						</p>
						<p class="flex">
							<Star
								class="fill-stone-500"
								fill={null}
							/>
							<span class="block ml-1 -mt-px text-stone-500">
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
		<p class="opacity-50 flex flex-wrap items-center text-sm">
			<GeoPin />
			{#if addresses.length > 1}
				{#each addresses as address}
					{@const isLink =
						address.includes("https://") || address.includes("http://")}
					<a
						class="px-1 py-px underline"
						href={isLink ? address : `https://maps.google.com/?q=${address}`}
						target="_blank"
						rel="noreferrer"
					>
						{truncateString(isLink ? "see on map" : address, 30)},
					</a>
				{/each}
			{:else}
				{@const isLink =
					addresses[0].includes("https://") || addresses[0].includes("http://")}
				<a
					class="px-1 underline truncate"
					href={isLink
						? addresses[0]
						: `https://maps.google.com/?q=${addresses[0]}`}
					target="_blank"
					rel="noreferrer"
				>
					{addresses[0]}
				</a>
			{/if}
		</p>
		<p class="opacity-30 flex items-center mb-4 text-sm">
			<span>{humanDate}</span>
			<Separator />
			<span>{humanTime}</span>
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
			action="?/comingToEvent"
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

		{#if availableTimes.length > 1}
			<SecondaryButton
				title="{showTimes ? 'Hide' : 'Show'} time slots"
				on:click={showTimeSlots}
			/>
		{/if}

		{#if showTimes}
			<ul>
				{#each availableTimes.sort((a, b) => a - b) as time}
					{@const humanDate = getDateHumanFormat(time)}
					<li>
						{humanDate}, {getTimeHumanFormat(time)}
						{#if humanDate === getDateHumanFormat(new Date())}
							- today
						{/if}
					</li>
				{/each}
			</ul>
		{/if}

		<SecondaryButton
			title={isReminderSet ? "Reminder is set" : "Set reminder"}
			on:click={setReminder}
			disabled={isReminderSet}
		/>

		<SecondaryButton
			title="Share to"
			on:click={initShareProcess}
		/>

		<p class="my-4 whitespace-pre-wrap">
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
		{#if addresses.length === 1}
			<a
				class="bg-gray-100 font-regular text-indigo-700 rounded-xl p-3 block w-full my-4 text-center"
				href={`https://maps.google.com/?q=${addresses[0]}`}
				target="_blank"
				rel="noreferrer"
			>
				Open in Google Maps
			</a>
		{/if}
	</div>
</div>

<NotificationPopup />
