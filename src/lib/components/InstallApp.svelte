<script>
	import { onMount } from "svelte";

	import IosPwaPopup from "$lib/components/modals/IosPwaPopup.svelte";

	import { appState } from "$lib/stores/index.js";
	import { userState } from "$lib/stores/localStorage.js";
	import { isIos, isInStandaloneMode, openOverlay } from "$lib/utils/index.js";

	export let version = "shortcut";

	const textObj = {
		shortcut: {
			title: "Add a one-click shortcut to us on your home screen!",
			btn: "Add shortcut",
		},
		offline: {
			title:
				"No Wifi? No problem. Access offline content with a one-click installation.",
			btn: "Install",
		},
	};

	const dismissPwa = () => {
		appState.update(state => ({
			...state,
			pwaInstallPrompt: null,
			showPwaInstall: false,
		}));

		userState.update(state => ({
			...state,
			pwaDismissed: true,
		}));
	};

	const installPwa = async () => {
		if ($appState.isIos) {
			openOverlay("iosPwaPopup");
			return;
		}

		$appState.pwaInstallPrompt.prompt();
		await $appState.pwaInstallPrompt.userChoice;

		appState.update(state => ({
			...state,
			pwaInstallPrompt: null,
			showPwaInstall: false,
		}));
	};

	onMount(() => {
		if (isIos() && !isInStandaloneMode()) {
			if ($userState?.pwaDismissed) return;

			appState.update(state => ({
				...state,
				isIos: true,
				showPwaInstall: true,
			}));
		}
	});
</script>

{#if $appState.showPwaInstall}
	<div class="rounded-2xl my-6 bg-indigo-700 text-white p-4">
		<p>{textObj[version].title}</p>
		<div class="flex justify-end mt-2">
			<button
				class="opacity-70 mx-4 p-2"
				on:click|preventDefault={dismissPwa}
			>
				Not now
			</button>
			<button
				class="p-2 bg-white text-indigo-700 rounded-full px-4"
				on:click|preventDefault={installPwa}
			>
				{textObj[version].btn}
			</button>
		</div>
	</div>
{/if}

<IosPwaPopup />
