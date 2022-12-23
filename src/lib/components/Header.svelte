<script>
	import { fly, fade } from "svelte/transition";

	import Cross from "$lib/components/icons/Cross.svelte";
	import PrimaryButton from "$lib/components/ui/PrimaryButton.svelte";
	import { goto } from "$app/navigation";

	let isMenuOpened = false;

	const openMenu = () => {
		isMenuOpened = true;
	};

	const closeMenu = () => {
		isMenuOpened = false;
	};

	const clickOnBg = e => {
		if (e.target === e.currentTarget) closeMenu();
	};

	const openSubmitEventPage = e => {
		e.preventDefault();
		closeMenu();
		goto("submit-event");
	};
</script>

<header class="-mx-4 mb-4 p-4 text-white bg-indigo-700">
	<h1 class="text-2xl mt-2 relative">
		Free events in Dubai
		<button
			class="absolute w-10 h-10 p-2 right-0 top-1/2 -translate-y-1/2"
			on:click|preventDefault={openMenu}
		>
			<span class="relative w-6 h-6 block">
				<span class="absolute bg-white w-full h-1/6 inset-x-0 top-0" />
				<span class="absolute bg-white w-full h-1/6 inset-x-0 top-2" />
				<span class="absolute bg-white w-full h-1/6 inset-x-0 top-4" />
			</span>
		</button>
	</h1>

	<!--	<p class="mt-4">-->
	<!--		Sorted by: time-->
	<!--	</p>-->
</header>

{#if isMenuOpened}
	<section
		class="fixed inset-0 bg-gray-800/50 z-10"
		role="dialog"
		transition:fade={{ duration: 100 }}
		on:click={clickOnBg}
	>
		<nav
			class="absolute bg-white top-0 inset-x-0 max-w-xl mx-auto p-4 pb-0 text-center"
			in:fly={{ y: -150, duration: 300 }}
			out:fly={{ y: -150, duration: 300 }}
		>
			<ul>
				<li>
					<button
						class="p-2"
						on:click|preventDefault={closeMenu}
					>
						<Cross />
					</button>
				</li>
				<li>
					<a
						class="p-2 block"
						href="articles/dubai-free-tips"
					>
						save money tips
					</a>
				</li>
				<li>
					<a
						class="p-2 block"
						href="articles/dubai-free-places"
					>
						visit every day
					</a>
				</li>
				<li>
					<PrimaryButton
						class="mt-2"
						title="Submit event"
						on:click={openSubmitEventPage}
					/>
				</li>
			</ul>
		</nav>
	</section>
{/if}
