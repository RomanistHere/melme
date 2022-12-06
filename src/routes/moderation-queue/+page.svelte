<script>
	import { goto } from "$app/navigation";

	import Card from "$lib/components/Card.svelte";
	import PrimaryButton from "$lib/components/ui/PrimaryButton.svelte";

	import { sortByDateAndTime } from "$lib/utils/index.js";

	// `data` comes from export in +page.server.js
	export let data;

	$: ({ events } = data);
	$: sortedByDateEvents = sortByDateAndTime(events);

	const openSubmitEventPage = e => {
		e.preventDefault();
		goto("submit-event");
	};
</script>

<svelte:head>
	<title>melme - More Events for Less Money</title>
</svelte:head>

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
		href="/"
		class="underline"
	>
		see approved events
	</a>
</div>
