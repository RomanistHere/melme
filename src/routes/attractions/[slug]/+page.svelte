<script>
	import LikeButton from "$lib/components/ui/LikeButton.svelte";
	import PrimaryButton from "$lib/components/ui/PrimaryButton.svelte";
	import Seo from "$lib/components/Seo.svelte";
	import GeoPin from "$lib/components/icons/GeoPin.svelte";
	import Star from "$lib/components/icons/Star.svelte";
	import Separator from "$lib/components/icons/Separator.svelte";
	import SecondaryButton from "$lib/components/ui/SecondaryButton.svelte";
	import SubscriptionPopup from "$lib/components/modals/SubscriptionPopup.svelte";
	import BackButton from "$lib/components/ui/BackButton.svelte";

	import {
		truncateString,
		getClosestDateToNow,
		getTimeHumanFormat,
		getDateHumanFormat,
		openOverlay,
		showError,
		getEndTime,
		padTime,
	} from "$lib/utils/index.js";
	import { userState } from "$lib/stores/localStorage.js";
	import Map from "$lib/components/Map/Map.svelte";
	import InstallApp from "$lib/components/InstallApp.svelte";

	export let data;

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
		linkToWebsite,
		duration,
		registrationLink,
		requirements,
		isRegistrationNeeded,
		vapidPublicKey,
		location,
	} = data);

	$: isInstanceOfDate = times[0] instanceof Date;
	$: isLiked = $userState?.likedEvents?.includes(slug);
	$: date = getClosestDateToNow(times, isInstanceOfDate);
	$: humanDate = getDateHumanFormat(date);
	$: humanTime = getTimeHumanFormat(date);
	$: timeEnd = !isInstanceOfDate && getEndTime(times);
	$: showTimes = false;

	const hostRating = "0.0";

	const todayDay = new Date().getUTCDay();
	const days = {
		0: "Sunday",
		1: "Monday",
		2: "Tuesday",
		3: "Wednesday",
		4: "Thursday",
		5: "Friday",
		6: "Saturday",
	};

	const openSubscriptionPopup = e => {
		e.preventDefault();

		openOverlay("subscriptionPopup");
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
				title: `See ${title} on melme.io:`,
			});
		} catch (error) {
			showError(error);
		}
	};
</script>

<Seo
	title={`melme | ${title.toLowerCase()}`}
	{description}
	image={imgSrc}
/>

<div class="-mx-4 bg-white">
	<BackButton />
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
			<span>
				{humanTime}
				{#if timeEnd}
					- {timeEnd}
				{/if}
			</span>
			{#if isInstanceOfDate}
				<Separator />
				<span>{duration}</span>
			{/if}
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

		{#if times.length > 1}
			<SecondaryButton
				title="{showTimes ? 'Hide' : 'Show'} visiting time"
				on:click={showTimeSlots}
			/>
		{/if}

		{#if showTimes}
			<ul>
				{#each times as { weekday, startHour, startMinute, endHour, endMinute }}
					<li>
						<span class="min-w-[6rem] inline-block">
							{days[weekday]}
						</span>

						{#if startHour === endHour && startMinute === endMinute}
							day off
						{:else}
							from
							{padTime(startHour)}:{padTime(startMinute)}
							till
							{padTime(endHour)}:{padTime(endMinute)}
						{/if}

						{#if todayDay === weekday}
							- today
						{/if}
					</li>
				{/each}
			</ul>
		{/if}

		<p class="my-4 whitespace-pre-wrap">
			{description}
		</p>

		{#if requirements}
			<p class="my-4 whitespace-pre-wrap break-words">
				{requirements}
			</p>
		{/if}

		<p class="my-4">
			Website:
			<a
				href={linkToEvent || linkToWebsite}
				class="underline"
			>
				{truncateString(linkToEvent || linkToWebsite, 60)}
			</a>
		</p>

		{#if isRegistrationNeeded && registrationLink}
			Registration: <a
				href={registrationLink}
				class="underline"
			>
				{truncateString(registrationLink, 20)}
			</a>
		{/if}

		<InstallApp version="offline" />

		{#if location}
			<h2 class="mb-2 mt-6 font-bold text-lg">Location</h2>
			<p>
				<i>blue pin</i>
				- location of the attraction
			</p>
			{#if location.bestWatchFrom && location.bestWatchFrom.length > 0}
				<p>
					<i>gray pin</i>
					- good spot to observe
				</p>
			{/if}

			<div class="h-96 -mx-6 mt-2 mb-6">
				<Map
					poisData={location.bestWatchFrom &&
						location.bestWatchFrom.length > 0 && [
							{
								location: location.bestWatchFrom,
							},
						]}
					highlightedPoisData={location.coordinates &&
						location.coordinates.length > 0 && [
							{
								location: location.coordinates,
							},
						]}
					shouldCenterOnResults={true}
					isPoisClickable={false}
				/>
			</div>
		{/if}

		{#if !$userState?.isSubscribed}
			<PrimaryButton
				title="Subscribe to learn about places like this"
				on:click={openSubscriptionPopup}
			/>
		{/if}

		<SecondaryButton
			title="Share to"
			on:click={initShareProcess}
		/>

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

<SubscriptionPopup />
