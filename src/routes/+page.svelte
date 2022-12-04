<script>
	import { goto } from "$app/navigation";

	import Card from "$lib/components/Card.svelte";
	import PrimaryButton from "$lib/components/ui/PrimaryButton.svelte";
	import Header from "$lib/components/Header.svelte";
	import Categories from "$lib/components/Categories.svelte";

	// `data` comes from export in +page.server.js
	export let data;

	// this is a Svelte way to destructure property and keep it reactive
	// basically it's equals to `const { events } = data`, where `events` will be updated when `data` is
	$: ({ events } = data);
	$: sortedByDateEvents = events.sort((objA, objB) => {
		if (objA.date < objB.date) return -1;
		else if (objA.date > objB.date) return 1;
		else if (objA.date === objB.date) {
			if (objA.time < objB.time) return -1;
			else if (objA.time > objB.time) return 1;
			else return 0;
		}
	});

	const openSubmitEventPage = e => {
		e.preventDefault();
		goto("submit-event");
	};
</script>

<svelte:head>
	<title>melme - More Events for Less Money</title>
</svelte:head>

<Header />

<Categories />

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
	or <a
		href="/moderation-queue"
		class="underline"
	>
		discover not yet approved by moderation events
	</a>
</div>
