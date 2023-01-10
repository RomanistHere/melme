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
			previousPage: from?.url.pathname || state.previousPage,
		}));
	});

	const getUrlChanges = async () => {
		const url = new URL(window.location.href);
		const verifyToken = url.searchParams.get("verify_token");
		if (verifyToken) {
			url.searchParams.delete("verify_token");
			const resp = await fetch("/api/user/verifyRegistration", {
				method: "POST",
				body: JSON.stringify({
					token: verifyToken,
				}),
			});
			const { error, data } = await resp.json();
			// todo: show notification or popup here
		}

		window.history.replaceState(null, null, url);
	};

	if (typeof window !== "undefined") {
		getUrlChanges();
	}
</script>

<svelte:window on:beforeinstallprompt={beforePwaInstallHandle} />

<svelte:head>
	<script
		defer
		data-domain="melme.io"
		data-api="/stats/api/event"
		src="/stats/js/script.js"
	></script>
	<script>
		window.plausible =
			window.plausible ||
			function () {
				(window.plausible.q = window.plausible.q || []).push(arguments);
			};
	</script>
</svelte:head>

<div class="max-w-lg mx-auto min-h-screen flex flex-col">
	<div class="flex-1">
		<slot />
	</div>

	<Footer />
</div>
