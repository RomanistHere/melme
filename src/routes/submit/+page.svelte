<script>
	import TextLink from "$lib/components/ui/TextLink.svelte";
	import Header from "$lib/components/Header.svelte";
</script>

<Header />

<div class="mt-20 mb-12 text-3xl text-center">
	<TextLink
		title="Event"
		href="submit/event"
	/>
	or
	<TextLink
		title="Attraction"
		href="submit/attraction"
	/>
</div>

<p class="mb-2 text-lg">
	Event - something that happens in or for a limited period of time, <i>
		e.g. Burj Khalifa Laser Show
	</i>
	.
</p>

<p class="text-lg">
	Attraction - place of interest that exists and hosts visitors on a daily
	basis, <i>e.g. Coffee Museum</i>
	.
</p>
