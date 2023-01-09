<script>
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";

	import { categoryList, attractionCategoryList } from "$lib/config.js";
	// import { userState } from "$lib/stores/localStorage.js";

	export let externalFilters;
	export let onCategoryChange = () => {};
	export let isAttractions = false;

	$: categories = isAttractions ? attractionCategoryList : categoryList;
	$: listOfActiveCategories = [];
	// $: isLikesNotEmpty =
	// 	$userState?.likedEvents &&
	// 	$userState.likedEvents.length !== 0;
	$: isLikesNotEmpty = false;

	let isLikedActive = false;

	const toggleCategory = category => {
		if (listOfActiveCategories.includes(category)) {
			listOfActiveCategories = listOfActiveCategories.filter(
				item => item !== category
			);
		} else {
			listOfActiveCategories = [...listOfActiveCategories, category];
		}

		if (listOfActiveCategories.length > 0) {
			$page.url.searchParams.set(
				"categories",
				listOfActiveCategories.join("-")
			);
		} else {
			$page.url.searchParams.delete("categories");
		}

		onCategoryChange();

		goto($page.url.href, {
			replaceState: true,
			invalidateAll: true,
		});
	};

	const toggleLikedDisplay = () => {
		isLikedActive = !isLikedActive;
		if (isLikedActive) externalFilters = [...externalFilters, "likes"];
		else externalFilters = externalFilters.filter(i => i !== "likes");
	};

	onMount(() => {
		listOfActiveCategories =
			$page.url.searchParams.get("categories")?.split("-") || [];
	});
</script>

<div class="w-full overflow-hidden">
	<ul class="-mx-1 text-sm pb-3 whitespace-nowrap overflow-y-scroll">
		{#if isLikesNotEmpty}
			<li
				class="mx-1 bg-gray-100 inline-block rounded-2xl py-1 px-2 m-1 text-stone-500"
				class:bg-indigo-700={isLikedActive}
				class:text-white={isLikedActive}
				class:text-stone-500={!isLikedActive}
			>
				<button on:click={toggleLikedDisplay}>your likes</button>
			</li>
		{/if}
		{#each categories as category}
			{@const isActive = listOfActiveCategories.includes(category)}
			<li class="inline-block">
				<button
					class="mx-1 rounded-2xl py-1 px-2 m-1 text-stone-500"
					class:bg-gray-100={!isActive}
					class:bg-indigo-700={isActive}
					class:text-white={isActive}
					class:text-stone-500={!isActive}
					on:click={() => {
						toggleCategory(category);
					}}
				>
					{category}
				</button>
			</li>
		{/each}
	</ul>
</div>
