<script>
	import { afterNavigate } from "$app/navigation";

	import "../app.css";

	import Footer from "$lib/components/Footer.svelte";

	import { appState } from "$lib/stores/index.js";
	import { userState } from "$lib/stores/localStorage.js";

	const beforePwaInstallHandle = e => {
		e.preventDefault();

		if ($userState?.pwaDismissed) return;

		appState.update(state => ({
			...state,
			pwaInstallPrompt: e,
			showPwaInstall: true,
		}));
	};

	afterNavigate(({ from }) => {
		appState.update(state => ({
			...state,
			previousPage: from?.url.pathname || state.previousPage
		}));
	});
</script>

<svelte:window on:beforeinstallprompt={beforePwaInstallHandle} />

<svelte:head>
	<script
		defer
		data-domain="melme.io"
		src="/stats/js/script.js"
	></script>
	<script>
		window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }
	</script>
</svelte:head>

<div class="max-w-lg mx-auto min-h-screen flex flex-col">
	<div class="flex-1">
		<slot />
	</div>

	<Footer />
</div>
