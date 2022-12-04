<script>
	import { goto } from "$app/navigation";

	import Card from "$lib/components/Card.svelte";
	import PrimaryButton from "$lib/components/ui/PrimaryButton.svelte";

	// `data` comes from export in +page.server.js
	export let data;

	// this is a Svelte way to destructure property and keep it reactive
	// basically it's equals to `const { events } = data`, where `events` will be updated when `data` is
	$: ({ events } = data);

	const openSubmitEventPage = e => {
		e.preventDefault();
		goto("submit-event");
	};
</script>

<svelte:head>
	<title>melme - More Events for Less Money</title>
</svelte:head>

<ul>
	{#each events as event}
		<li>
			<Card {...event} />
		</li>
	{/each}
</ul>

<PrimaryButton
	title="Submit event"
	on:click={openSubmitEventPage}
/>
