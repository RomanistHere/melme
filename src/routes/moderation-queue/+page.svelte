<script>
	import { goto } from "$app/navigation";

	import Card from "$lib/components/Card/Card.svelte";
	import PrimaryButton from "$lib/components/ui/PrimaryButton.svelte";
	import Header from "$lib/components/Header.svelte";
	import Categories from "$lib/components/Categories.svelte";
	import TextLink from "$lib/components/ui/TextLink.svelte";

	import { sortByDateAndTime } from "$lib/utils/index.js";
	import { userState } from "$lib/stores/localStorage.js";
	import Seo from "$lib/components/Seo.svelte";

	// `data` comes from export in +page.server.js
	export let data;

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

	const updateUserState = () => {
		userState.update(state => ({
			...state,
			isModQueueVisited: true,
		}));
	};
</script>

<Seo title="melme | discovery queue" />

{#if $userState && $userState.isModQueueVisited}
	<Header note="(Discovery)" />

	<Categories bind:externalFilters={frontendFilers} />

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

		<PrimaryButton
			title="Submit event"
			on:click={openSubmitEventPage}
		/>

		<div class="text-center pb-8">
			or <TextLink title="see approved events" />
		</div>
	{/if}
{:else}
	<div class="h-screen flex items-center text-center">
		<div>
			<p class="mb-8">
				This page shows content, submitted by other users. Since it doesn't
				require any sort of verification before submitting the event, literally
				anyone could have posted anything here. <span class="italic">
					Use it at your own risk.
				</span>
				Likely, though, it's not that bad.
			</p>
			<PrimaryButton
				title="I understand and want to proceed"
				on:click={updateUserState}
			/>
			<TextLink
				title="I want to go back"
				class="mt-2 block text-center"
			/>
		</div>
	</div>
{/if}
