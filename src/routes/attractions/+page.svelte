<script>
	import { onMount } from "svelte";
	import { page } from "$app/stores";

	import Card from "$lib/components/Card/Card.svelte";
	import PrimaryButton from "$lib/components/ui/PrimaryButton.svelte";
	import Header from "$lib/components/Header.svelte";
	import Seo from "$lib/components/Seo.svelte";
	import Categories from "$lib/components/Categories.svelte";
	import TextLink from "$lib/components/ui/TextLink.svelte";
	import InstallApp from "$lib/components/InstallApp.svelte";

	import { userState } from "$lib/stores/localStorage.js";
	import { loadedEvents, appState } from "$lib/stores/index.js";
	import { sortByDateAndTime } from "$lib/utils/index.js";
	import { appConfig } from "$lib/config.js";

	export let data;

	$: ({ events } = data);
	$: loadedEvents.set(events);
	$: frontendFilers = [];
	// $: updateFrontendFilters(frontendFilers);
	$: areAnyResultLeft = events.length >= appConfig.firstResultsLimit;

	const updateFrontendFilters = listOfFilters => {
		if (listOfFilters.includes("likes")) {
			events = events.filter(item =>
				$userState.likedEvents.includes(item.slug)
			);
		} else {
			// events = sortByDateAndTime(events);
		}
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
		const fixTimes = parsedResp.data.map(item => {
			const { times } = item;
			const fixedTimes = times.map(timeStr => new Date(timeStr));

			return {
				...item,
				times: fixedTimes,
			};
		});
		loadedEvents.update(curEvents => [...curEvents, ...fixTimes]);
		events = sortByDateAndTime($loadedEvents);

		if (parsedResp.data.length < appConfig.moreResultsLimit)
			areAnyResultLeft = false;
	};

	onMount(resetPaginationChanges);
</script>

<Seo />

<Header viewButton="map" />

<Categories
	bind:externalFilters={frontendFilers}
	onCategoryChange={resetPaginationChanges}
	isAttractions={true}
/>

{#if events.length === 0}
	<p class="text-center mt-12 mb-2">
		We didn't find any results for you. Choosing another category might help.
	</p>

	<p class="text-center">
		You can also
		<TextLink
			href="/"
			title="check free events"
		/>
		or
		<TextLink
			href="/submit/attraction"
			title="Submit an activity"
		/>
	</p>
{:else}
	<ul>
		{#each events as event, i (event.slug)}
			<li>
				<Card {...event} />
			</li>
			{#if i === 5}
				<li>
					<InstallApp />
				</li>
			{/if}
		{/each}
	</ul>

	{#if areAnyResultLeft}
		<PrimaryButton
			title="Load more"
			on:click={fetchMoreEvents}
		/>
	{:else}
		<p class="pt-3 pb-7 text-center">
			Looks like that's all we got for now... Didn't find anything interesting?
			<TextLink
				href="/moderation-queue"
				title="Check our discovery queue"
			/>
			or
			<TextLink
				href="/submit/attraction"
				title="Submit an attraction"
			/>
		</p>
	{/if}
{/if}
