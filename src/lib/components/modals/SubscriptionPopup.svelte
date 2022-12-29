<script>
	import { fly, fade } from "svelte/transition";

	import PrimaryButton from "$lib/components/ui/PrimaryButton.svelte";
	import SecondaryButton from "$lib/components/ui/SecondaryButton.svelte";
	import Input from "$lib/components/ui/Input.svelte";

	import { modalState } from "$lib/stores/index.js";
	import { closeOverlay, truncateString } from "$lib/utils/index.js";
	import { userState } from "$lib/stores/localStorage.js";

	$: ({ subscriptionPopup } = $modalState);
	$: err = null;
	$: success = null;

	let userEmail = null;
	let isInputError = false;

	const closePopup = () => {
		err = null;
		success = null;
		isInputError = false;
		closeOverlay("subscriptionPopup");
	};

	const clickOnBg = e => {
		if (e.target === e.currentTarget) closePopup();
	};

	const sendEmail = async () => {
		err = null;
		success = null;
		isInputError = false;

		if (!userEmail || !userEmail.includes("@") || userEmail.split("@").filter(Boolean).length !== 2 || userEmail.length < 7) {
			isInputError = true;
			return;
		}

		try {
			const resp = await fetch("/api/saveEmail", {
				method: "POST",
				body: JSON.stringify({
					email: userEmail,
				}),
				headers: {
					"Content-type": "application/json",
				},
			});

			const { error } = await resp.json();
			if (error) throw new Error(error);

			success = true;
			userState.update(prevState => ({
				...prevState,
				isSubscribed: true,
			}));
		} catch (e) {
			err = e;
			console.log(e);
		}
	};
</script>

{#if subscriptionPopup.active}
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
			{#if err}
				<p class="text-lg mb-1">
					{truncateString(err, 80)}
				</p>

				<p class="text-sm opacity-40 mb-6">Something went wrong. Your address wasn't saved.</p>

				<SecondaryButton
					title="Try again"
					on:click={sendEmail}
				/>
				<PrimaryButton
					title="Understood"
					on:click={closePopup}
				/>
			{:else if success}
				<p class="text-lg mb-1">Success!</p>

				<p class="text-sm opacity-40 mb-6">
					We will be in touch with you soon.
				</p>
				<PrimaryButton
					title="Got ya"
					on:click={closePopup}
				/>
			{:else}
				<p class="text-lg mb-1">
					When we ready, we will occasionally send you emails with the best events we find.
				</p>

				<p class="text-sm opacity-40 mb-6">
					And some big news, if you want to.
				</p>

				<Input
					title="Your email address"
					bind:value={userEmail}
					externalError={isInputError && "Wrong address format"}
				/>

				<SecondaryButton
					title="Oh no, you won't!"
					on:click={closePopup}
				/>
				<PrimaryButton
					title="Yes, please"
					on:click={sendEmail}
				/>
			{/if}
		</div>
	</section>
{/if}
