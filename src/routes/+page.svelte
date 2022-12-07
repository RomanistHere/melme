<script>
	import { goto } from "$app/navigation";

	import Card from "$lib/components/Card.svelte";
	import PrimaryButton from "$lib/components/ui/PrimaryButton.svelte";
	import Header from "$lib/components/Header.svelte";
	import Categories from "$lib/components/Categories.svelte";
	import TextLink from "$lib/components/ui/TextLink.svelte";

	import { userState } from "$lib/stores/localStorage.js";
	import { sortByDateAndTime } from "$lib/utils/index.js";

	// `data` comes from export in +page.server.js
	export let data;

	// this is a Svelte way to destructure property and keep it reactive
	// basically it's equals to `const { events } = data`, where `events` will be updated when `data` is
	$: ({ events } = data);
	$: sortedByDateEvents = sortByDateAndTime(events);
	$: frontendFilers = [];
	$: updateFrontendFilters(frontendFilers);

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
</script>

<svelte:head>
	<title>melme - More Events for Less Money</title>
</svelte:head>

<Header />

<Categories bind:externalFilters={frontendFilers} />

<PrimaryButton
	title="Submit event"
	on:click={openSubmitEventPage}
/>

{#if sortedByDateEvents.length === 0}
	<p class="text-center my-14">
		We didn't find any results for you. Pick another
		category or <TextLink
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

<div class="text-center pb-8">
	Didn't find anything interesting?
	<TextLink
		href="/moderation-queue"
		title="Discover not yet approved by moderation events"
	/>
</div>
