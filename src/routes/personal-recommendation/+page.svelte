<script>
	import Seo from "$lib/components/Seo.svelte";
	import CategoryPicker from "$lib/components/CategoryPicker.svelte";
	import PrimaryButton from "$lib/components/ui/PrimaryButton.svelte";
	import RadioButtons from "$lib/components/ui/RadioButtons.svelte";

	import { categoryList, attractionCategoryList } from "$lib/config.js";

	let pickedList = [];
	let ageGroupCur = null;
	let crowdGroupCur = null;

	const ageGroups = [
		"Younger than 25 years",
		"25 - 40 years",
		"41 - 55 years",
		"Older than 55 years",
	];
	const crowdGroups = [
		"Yes",
		"No",
		"I can bear it for something worthy"
	];
	const distanceGroups = [
		"Walkable",
		"Under 30 min by car",
		"Anywhere in Dubai"
	];
	const listOfInterests = [ ...new Set([ ...categoryList, ...attractionCategoryList ]) ].sort();
	const moods = {
		discoveries: "🚀",
		chill: "🧘‍♂️",
		socializing: "😎",
	};

	$: config = {
		mood: null,
		stage: "mood",
		ageGroup: null,
		crowdGroup: null,
		listOfInterests: [],
	};

	const selectMood = mood => {
		config = { ...config, mood, stage: "info1" };
	};

	const selectInterests = e => {
		e.preventDefault();
		config = {
			...config,
			stage: "info2",
			listOfInterests: [ ...pickedList ],
		};
	};

	const createRecommendation = e => {
		e.preventDefault();

		config = {
			...config,
			ageGroup: ageGroupCur,
			crowdGroup: crowdGroupCur,
		};
	};
</script>

<Seo
	title="melme | personal recommendation"
/>

<main class="pb-8">
	<h1 class="text-2xl mt-20 text-center mb-12 bg-white py-3">
		{#if config.stage === "mood"}
			What's on your mind today?
		{:else if config.stage === "info1"}
			Ok, let's hear about you
		{:else if config.stage === "info2"}
			And... final adjustments
		{/if}
	</h1>

	{#if config.stage === "mood"}
		<ul>
			{#each Object.keys(moods) as key}
				<li>
					<button
						class="bg-white rounded-xl block w-full my-3 py-6"
						on:click|preventDefault={() => { selectMood(key) }}
					>
					<span class="text-6xl block">
						{moods[key]}
					</span>
						<span class="mt-3 block capitalize text-lg">
						{key}
					</span>
					</button>
				</li>
			{/each}
		</ul>
	{:else if config.stage === "info1"}
		<div class="p-4 bg-white rounded-xl mb-6">
			<CategoryPicker
				title="Pick a few things that might interest you"
				list={listOfInterests}
				bind:pickedList
			/>
		</div>

		<PrimaryButton
			title={pickedList.length === 0 ? "Skip" : "Continue"}
			on:click={selectInterests}
		/>
	{:else if config.stage === "info2"}
		<RadioButtons
			title="What is your age group?"
			options={ageGroups}
			bind:group={ageGroupCur}
			class="my-4 bg-white p-4 rounded-xl"
		/>
		<RadioButtons
			title="Do you mind big crowds?"
			options={crowdGroups}
			bind:group={crowdGroupCur}
			class="my-4 bg-white p-4 rounded-xl"
		/>
		<RadioButtons
			title="What about distance from you? [in development]"
			options={distanceGroups}
			class="my-4 bg-white p-4 rounded-xl opacity-40"
			disabled={true}
		/>

		<PrimaryButton
			title="Create recommendation for me!"
			on:click={createRecommendation}
		/>
	{/if}
</main>