<script>
	import ArrowLeft from "$lib/components/icons/ArrowLeft.svelte";

	export let data;
	export let activeEvent;

	const scrollIntoViewAndHighlight = slug => {
		console.log(slug);
	};

	$: scrollIntoViewAndHighlight(activeEvent);
</script>

<div class="w-full overflow-hidden">
	<ul class="flex -mx-2 whitespace-nowrap overflow-y-scroll">
		{#each data as { slug, title, description, imgSrc } (slug)}
			<li class="w-48 mx-2 rounded-md">
				<img src={imgSrc[0]} alt="preview of the event">
				<h6 class="font-bold text-xl my-2">
					{title}
				</h6>
				<p>
					{description}
				</p>
				<a
					class="font-medium text-indigo-600 flex items-center"
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
			</li>
		{/each}
	</ul>
</div>
