<script>
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

	import Card from "$lib/components/ui/Card/Card.svelte";
	import PrimaryButton from "$lib/components/ui/PrimaryButton.svelte";
	import Header from "$lib/components/Header.svelte";
	import Seo from "$lib/components/Seo.svelte";
	import Categories from "$lib/components/Categories.svelte";
	import TextLink from "$lib/components/ui/TextLink.svelte";

	import { userState } from "$lib/stores/localStorage.js";
	import { loadedEvents, appState } from "$lib/stores/index.js";
	import {
		convertUTCToLocalDateIgnoringTimezone,
		sortDateByClosest,
	} from "$lib/utils/index.js";
	import { appConfig } from "$lib/config.js";

	// `data` comes from export in +page.server.js
	export let data;

	// this is a Svelte way to destructure property and keep it reactive
	// basically it's equals to `const { events } = data`, where `events` will be updated when `data` is
	$: ({ events } = data);
	$: loadedEvents.set(events);
	$: sortedByDateEvents = sortByDateAndTime(events);
	$: frontendFilers = [];
	$: updateFrontendFilters(frontendFilers);
	$: areAnyResultLeft = events.length >= appConfig.firstResultsLimit;

	const convertTimesToUTC = timesArr =>
		timesArr.map(convertUTCToLocalDateIgnoringTimezone);

	const sortByDateAndTime = objects => {
		const sortWithinObj = objects.map(item => ({
			...item,
			times: [...sortDateByClosest(convertTimesToUTC(item.times))],
		}));

		// todo: extend sorting to show live events first based on duration
		// todo: also if the same event is repeated for example at 15:00 and 16:00
		// todo: and duration is 45 min, at 15:30-15:45 it should still display "live" version
		const today = new Date();
		return sortWithinObj.sort((a, b) => {
			const distanceA = Math.abs(today - a.times[0]);
			const distanceB = Math.abs(today - b.times[0]);
			return distanceA - distanceB;
		});
	};

	const updateFrontendFilters = listOfFilters => {
		if (listOfFilters.includes("likes")) {
			sortedByDateEvents = sortedByDateEvents.filter(item =>
				$userState.likedEvents.includes(item.slug)
			);
		} else {
			sortedByDateEvents = sortByDateAndTime(events);
		}
	};

	const openSubmitEventPage = e => {
		e.preventDefault();
		goto("submit-event");
	};

	const resetPaginationChanges = () => {
		appState.update(state => ({
			...state,
			loadMorePressedTimes: 0,
		}));
	};

	const fetchMoreEvents = async e => {
		e.preventDefault();
		appState.update(state => ({
			...state,
			loadMorePressedTimes: state.loadMorePressedTimes + 1,
		}));

		const resp = await fetch("/api/getEventsLimited", {
			method: "POST",
			body: JSON.stringify({
				page: $appState.loadMorePressedTimes,
				categories: $page.url.searchParams.get("categories"),
				isApproved: true,
			}),
		});

		const parsedResp = await resp.json();
		loadedEvents.update(curEvents => [...curEvents, ...parsedResp.data]);
		sortedByDateEvents = $loadedEvents;

		if (parsedResp.data.length < appConfig.moreResultsLimit)
			areAnyResultLeft = false;
	};

	onMount(resetPaginationChanges);
</script>

<Seo />

<Header />

<Categories
	bind:externalFilters={frontendFilers}
	onCategoryChange={resetPaginationChanges}
/>

<PrimaryButton
	title="Submit event"
	on:click={openSubmitEventPage}
/>

{#if sortedByDateEvents.length === 0}
	<p class="text-center my-14">
		We didn't find any results for you. Pick another category or <TextLink
			title="submit your event"
			href="submit-event"
		/>.
	</p>
{:else}
	<ul>
		{#each sortedByDateEvents as event}
			<li>
				<Card {...event} />
			</li>
		{/each}
	</ul>
{/if}

{#if areAnyResultLeft}
	<PrimaryButton
		title="Load more"
		on:click={fetchMoreEvents}
	/>
{:else}
	<p class="pt-3 pb-7 text-center">Looks like we out of results...</p>
{/if}

<div class="text-center pb-8">
	Didn't find anything interesting?
	<TextLink
		href="/moderation-queue"
		title="Check our discovery queue"
	/>
</div>
