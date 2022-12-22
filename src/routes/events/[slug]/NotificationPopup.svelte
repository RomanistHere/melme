<script>
	import { fly, fade } from "svelte/transition";

	import PrimaryButton from "$lib/components/ui/PrimaryButton.svelte";
	import SecondaryButton from "$lib/components/ui/SecondaryButton.svelte";

	import { modalState } from "$lib/stores/index.js";
	import { closeOverlay } from "$lib/utils/index.js";

	$: ({ shouldSetNotificationPopup } = $modalState);

	let sub = null;

	const closePopup = () =>
		closeOverlay("shouldSetNotificationPopup");

	const clickOnBg = e => {
		if (e.target === e.currentTarget)
			closePopup();
	};

	const scheduleNotification = async () => {
		try {
			const status = await Notification.requestPermission();
			// todo: if status !== approved show notification or something
			if (status !== "approved")
				throw new Error("Without notifications permission it's not going to work. We're working on other ways to deliver notifications.");

			console.log(status);
			const reg = await navigator.serviceWorker.ready;
			sub = await reg.pushManager.getSubscription();

			if (!sub) {
				sub = await reg.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: shouldSetNotificationPopup.payload.vapidPublicKey,
				});
			}

			const closestDateInFuture = shouldSetNotificationPopup.payload.date;

			if (!closestDateInFuture)
				throw new Error("We didn't find this event in the future, so can't schedule a reminder.");

			const resp = await fetch("/api/savePushEndpoint", {
				method: "POST",
				body: JSON.stringify({
					subscription: sub.toJSON(),
					slug: shouldSetNotificationPopup.payload.slug,
					time: closestDateInFuture,
				}),
				headers: {
					"Content-type": "application/json",
				}
			});

			const { error } = await resp.json();
			if (error)
				throw new Error(error);

			closePopup();
		} catch (error) {
			console.log(error);
			alert(error);
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
			class="absolute rounded-t-3xl bg-white bottom-0 inset-x-0 p-6"
			in:fly="{{ y: 150, duration: 300 }}"
			out:fly="{{ y: -150, duration: 300 }}"
		>
			<p class="text-lg mb-1">
				Do you want to schedule a reminder-notification for 2h before the event?
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
		</div>
	</section>
{/if}