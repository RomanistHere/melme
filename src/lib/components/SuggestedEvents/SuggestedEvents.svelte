<script>
	import ArrowLeft from "$lib/components/icons/ArrowLeft.svelte";
	import CardLayout from "$lib/components/Card/CardLayout.svelte";

	import { getClosestDateToNow, sortByDateAndTime } from "$lib/utils/index.js";

	export let data;
	export let activeEvent;

	$: activeSlug = null;
	$: bindings = {};
	$: preparedData = sortByDateAndTime(data);

	const scrollIntoViewAndHighlight = slug => {
		activeSlug = null;
		if (!slug || !bindings[slug]) return;

		activeSlug = slug;
		bindings[slug].scrollIntoView({
			behavior: "smooth",
			block: "end",
			inline: "center",
		});
	};

	$: scrollIntoViewAndHighlight(activeEvent);
</script>

<div class="overflow-hidden fixed z-10 bg-white px-4 -mx-4 inset-x-0 bottom-0">
	<ul class="whitespace-nowrap overflow-y-scroll -mx-2 p-4">
		{#each preparedData as { slug, title, description, imgSrc, hostName, duration, isFree, price, times } (slug)}
			<li
				class="w-60 inline-block mx-2 rounded-2xl shadow-lg overflow-hidden"
				class:bg-indigo-100={activeSlug === slug}
				class:shadow-2xl={activeSlug === slug}
				bind:this={bindings[slug]}
			>
				<CardLayout
					{hostName}
					{slug}
					{imgSrc}
					{duration}
					{isFree}
					{price}
					date={getClosestDateToNow(times)}
					isSmall={true}
				/>
				<div class="p-4 whitespace-normal">
					<h6 class="font-bold my-2 truncate">
						{title}
					</h6>
					<p>
						{description}
					</p>
					<a
						class="font-medium text-indigo-600 mt-2 flex items-center"
						href="events/{slug}"
					>
						<span class="mr-1">Learn more</span>
						<div class="rotate-180 scale-90">
							<ArrowLeft
								fill={null}
								class="fill-indigo-600"
							/>
						</div>
					</a>
				</div>
			</li>
		{/each}
	</ul>
</div>
