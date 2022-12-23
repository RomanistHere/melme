<script>
	import { fly, fade } from "svelte/transition";

	import PrimaryButton from "$lib/components/ui/PrimaryButton.svelte";
	import SecondaryButton from "$lib/components/ui/SecondaryButton.svelte";

	import { modalState } from "$lib/stores/index.js";
	import { closeOverlay } from "$lib/utils/index.js";
	import { userState } from "$lib/stores/localStorage.js";

	$: ({ shouldSetNotificationPopup } = $modalState);
	$: error = null;
	$: success = null;

	let sub = null;

	const closePopup = () => closeOverlay("shouldSetNotificationPopup");

	const clickOnBg = e => {
		if (e.target === e.currentTarget) closePopup();
	};

	const scheduleNotification = async () => {
		error = null;
		success = null;

		try {
			const { slug } = shouldSetNotificationPopup.payload;
			const status = await Notification.requestPermission();

			if (status !== "granted")
				throw new Error(
					"Without notifications permission it's not going to work. We're working on other ways to deliver notifications."
				);

			const reg = await navigator.serviceWorker.ready;
			sub = await reg.pushManager.getSubscription();

			if (!sub) {
				sub = await reg.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey:
						shouldSetNotificationPopup.payload.vapidPublicKey,
				});
			}

			const closestDateInFuture = shouldSetNotificationPopup.payload.date;

			if (!closestDateInFuture)
				throw new Error(
					"We didn't find this event in the future, so can't schedule a reminder."
				);

			const resp = await fetch("/api/savePushEndpoint", {
				method: "POST",
				body: JSON.stringify({
					subscription: sub.toJSON(),
					slug,
					time: closestDateInFuture,
				}),
				headers: {
					"Content-type": "application/json",
				},
			});

			const { error } = await resp.json();
			if (error) throw new Error(error);

			userState.update(currentState => {
				if (!currentState) {
					return {
						reminderEvents: [slug],
					};
				}

				const { reminderEvents } = currentState;

				if (!reminderEvents || reminderEvents.length === 0) {
					return {
						...currentState,
						reminderEvents: [slug],
					};
				} else if (
					reminderEvents.length > 0 &&
					!reminderEvents.includes(slug)
				) {
					return {
						...currentState,
						reminderEvents: [...reminderEvents, slug],
					};
				}
			});

			success = true;
		} catch (e) {
			error = e;
			console.log(e);
		}
	};
</script>

{#if shouldSetNotificationPopup.active}
	<section
		class="fixed inset-0 bg-gray-800/50"
		role="dialog"
		transition:fade={{ duration: 100 }}
		on:click={clickOnBg}
	>
		<div
			class="absolute rounded-t-3xl bg-white bottom-0 inset-x-0 max-w-xl mx-auto p-6"
			in:fly={{ y: 150, duration: 300 }}
			out:fly={{ y: -150, duration: 300 }}
		>
			{#if error}
				<p class="text-lg mb-1">
					{error}
				</p>

				<p class="text-sm opacity-40 mb-6">Reminder is not scheduled.</p>

				<SecondaryButton
					title="Try again"
					on:click={scheduleNotification}
				/>
				<PrimaryButton
					title="Understood"
					on:click={closePopup}
				/>
			{:else if success}
				<p class="text-lg mb-1">Success!</p>

				<p class="text-sm opacity-40 mb-6">
					Make sure, the app has access to push notifications.
				</p>
				<PrimaryButton
					title="Got ya"
					on:click={closePopup}
				/>
			{:else}
				<p class="text-lg mb-1">
					Do you want to schedule a reminder-notification for 2h before the
					event?
				</p>

				<p class="text-sm opacity-40 mb-6">
					No registration or email is required.
				</p>

				<SecondaryButton
					title="Nope"
					on:click={closePopup}
				/>
				<PrimaryButton
					title="Yes, please"
					on:click={scheduleNotification}
				/>
			{/if}
		</div>
	</section>
{/if}
