<script>
	import "../app.css";
	import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
	<script
		defer
		data-domain="melme.io"
		src="https://plausible.io/js/script.js"
	></script>
</svelte:head>

<div class="max-w-lg mx-auto min-h-screen flex flex-col">
	<div class="flex-1">
		<slot />
	</div>

	<Footer />
</div>
