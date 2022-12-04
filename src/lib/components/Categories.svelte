<script>
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";

	import { categoryList } from "$lib/config.js";

	$: listOfActiveCategories = [];

	const toggleCategory = category => {
		if (listOfActiveCategories.includes(category))
			listOfActiveCategories =
				listOfActiveCategories.filter(
					item => item !== category
				);
		else
			listOfActiveCategories = [
				...listOfActiveCategories,
				category,
			];

		if (listOfActiveCategories.length > 0) {
			$page.url.searchParams.set(
				"categories",
				listOfActiveCategories.join("-")
			);
		} else {
			$page.url.searchParams.delete("categories");
		}

		goto($page.url.href, {
			replaceState: true,
			invalidateAll: true,
		});
	};

	onMount(() => {
		listOfActiveCategories =
			$page.url.searchParams
				.get("categories")
				?.split("-") || [];
	});
</script>

<nav class="w-full overflow-hidden">
	<ul
		class="-mx-1 text-sm pb-3 whitespace-nowrap overflow-y-scroll"
	>
		{#each categoryList as category}
			{@const isActive =
				listOfActiveCategories.includes(category)}
			<li
				class="mx-1 bg-gray-100 inline-block rounded-2xl py-1 px-2 m-1 text-stone-500"
				class:bg-indigo-700={isActive}
				class:text-white={isActive}
				class:text-stone-500={!isActive}
			>
				<button
					on:click={() => {
						toggleCategory(category);
					}}
				>
					{category}
				</button>
			</li>
		{/each}
	</ul>
</nav>
