<script>
	import { fly, fade } from "svelte/transition";

	import PrimaryButton from "$lib/components/ui/PrimaryButton.svelte";

	import { appState, modalState } from "$lib/stores/index.js";
	import { closeOverlay } from "$lib/utils/index.js";
	import { userState } from "$lib/stores/localStorage.js";

	$: ({ iosPwaPopup } = $modalState);

	const closePopup = () => closeOverlay("iosPwaPopup");

	const clickOnBg = e => {
		if (e.target === e.currentTarget) closePopup();
	};

	const dismissPwa = e => {
		e.preventDefault();

		appState.update(state => ({
			...state,
			pwaInstallPrompt: null,
			showPwaInstall: false,
		}));

		userState.update(state => ({
			...state,
			pwaDismissed: true,
		}));

		closePopup();
	};
</script>

{#if iosPwaPopup.active}
	<section
		class="fixed inset-0 bg-gray-800/50 z-20"
		role="dialog"
		transition:fade={{ duration: 100 }}
		on:click={clickOnBg}
	>
		<div
			class="absolute rounded-t-3xl bg-white bottom-0 inset-x-0 max-w-xl mx-auto p-6"
			in:fly={{ y: 150, duration: 300 }}
			out:fly={{ y: 150, duration: 300 }}
		>
			<p class="text-lg mb-1">
				To install this webapp in your phone, tap share button:
				<svg
					class="inline"
					width="16"
					height="27"
					viewBox="0 0 16 27"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect
						x="1"
						y="12"
						width="14"
						height="14"
						stroke="#6FA3E1"
						stroke-width="2"
					/>
					<path
						d="M8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 19L9 10H7L7 19H9ZM9 10L9 1H7L7 10H9Z"
						fill="#6FA3E1"
					/>
				</svg>
				- and then "Add to Home Screen".
			</p>

			<PrimaryButton
				title="Got ya!"
				on:click={dismissPwa}
			/>
		</div>
	</section>
{/if}
