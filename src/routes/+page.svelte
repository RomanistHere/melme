<script>
	import { onMount } from "svelte";
	import { page } from "$app/stores";

	import Card from "$lib/components/Card/Card.svelte";
	import PrimaryButton from "$lib/components/ui/PrimaryButton.svelte";
	import Header from "$lib/components/Header.svelte";
	import Seo from "$lib/components/Seo.svelte";
	import Categories from "$lib/components/Categories.svelte";
	import TextLink from "$lib/components/ui/TextLink.svelte";
	// import InstallApp from "$lib/components/InstallApp.svelte";

	import { userState } from "$lib/stores/localStorage.js";
	import { loadedEvents, appState } from "$lib/stores/index.js";
	import { logError, sortByDateAndTime } from "$lib/utils/index.js";
	import { appConfig } from "$lib/config.js";

	export let data;

	$: ({ events } = data);
	$: loadedEvents.set(events);
	$: sortedByDateEvents = sortByDateAndTime(events);
	$: frontendFilers = [];
	$: updateFrontendFilters(frontendFilers);
	$: areAnyResultLeft = events.length >= appConfig.firstResultsLimit;

	const updateFrontendFilters = listOfFilters => {
		if (listOfFilters.includes("likes")) {
			sortedByDateEvents = sortedByDateEvents.filter(item =>
				$userState.likedEvents.includes(item.slug)
			);
		} else {
			sortedByDateEvents = sortByDateAndTime(events);
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
		sortedByDateEvents = sortByDateAndTime($loadedEvents);

		if (parsedResp.data.length < appConfig.moreResultsLimit)
			areAnyResultLeft = false;

		try {
			// eslint-disable-next-line no-undef
			plausible("Load more");
		} catch (err) {
			logError(err);
		}
	};

	onMount(resetPaginationChanges);
</script>

<Seo />

<Header viewButton="map" />

<Categories
	bind:externalFilters={frontendFilers}
	onCategoryChange={resetPaginationChanges}
/>

{#if sortedByDateEvents.length === 0}
	<p class="text-center mt-12 mb-2">
		We didn't find any results for you. Choosing another category might help.
	</p>

	<p class="text-center">
		You can also
		<TextLink
			href="/attractions"
			title="check popular free activities"
		/>
		or
		<TextLink
			href="/submit/event"
			title="Submit an event"
		/>
	</p>
{:else}
	<ul>
		{#each sortedByDateEvents as event, i (event.slug)}
			<li>
				<Card {...event} />
			</li>
			<!--{#if i === 5}-->
			<!--	<li>-->
			<!--		<InstallApp />-->
			<!--	</li>-->
			<!--{/if}-->
			{#if i === 10}
				<li>
					<div class="rounded-2xl my-6 bg-indigo-700 text-white p-4">
						<p>
							Can't find interesting events? We collected popular free
							activities for you!
						</p>
						<div class="flex justify-end mt-2">
							<a
								class="p-2 bg-white text-indigo-700 rounded-full px-4"
								href="/attractions"
							>
								Check the activities
							</a>
						</div>
					</div>
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
				href="/attractions"
				title="Check popular free activities"
			/>
			or
			<TextLink
				href="/submit/event"
				title="Submit an event"
			/>
		</p>
	{/if}
{/if}
