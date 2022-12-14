<script>
	import { enhance } from "$app/forms";

	import Input from "$lib/components/ui/Input.svelte";
	import Textarea from "$lib/components/ui/Textarea.svelte";
	import PrimaryButton from "$lib/components/ui/PrimaryButton.svelte";
	import ArrowLeft from "$lib/components/icons/ArrowLeft.svelte";
	import Seo from "$lib/components/Seo.svelte";
	import TogglerLink from "../TogglerLink.svelte";
	import CategoryPicker from "$lib/components/CategoryPicker.svelte";
	import TimeRangePicker from "../TimeRangePicker.svelte";
	import AddressPicker from "../AddressPicker.svelte";
	import LocationPicker from "../LocationPicker.svelte";

	import { handleClickBack } from "$lib/utils/index.js";
	import { attractionCategoryList } from "$lib/config.js";

	export let form;

	const enhanceCallback = ({ data }) => {
		data.append("categories", JSON.stringify(pickedList));
	};

	const updateView = data => {
		if (!data || data.success) return;

		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const resetValues = () => {
		pickedList = [];
		imgPreview = null;
	};

	$: updateView(form);

	let pickedList = [];
	$: imgPreview = null;
</script>

<Seo title="melme | submit attraction" />

<section class="max-w-2xl mx-auto py-8">
	{#if form?.success}
		<p class="text-2xl mb-2 text-center">Thank you!</p>
		<p class="text-center">
			The attraction was successfully sent! You can review it in
			<a
				href="/moderation-queue/attractions"
				class="underline"
			>
				the submission queue.
			</a>
			or
			<a
				href="/submit/attraction"
				class="underline"
				on:click={resetValues}
			>
				submit another one
			</a>
		</p>
	{:else}
		<a
			href="/static"
			on:click|preventDefault={handleClickBack}
			class="p-3 block -ml-3 mb-2"
		>
			<ArrowLeft />
		</a>

		<h1 class="mb-8 text-2xl">
			To submit an attraction, please, fill all the necessary fields marked with
			*
		</h1>

		{#if form?.error}
			<p class="my-4 text-red-500 text-center">
				Error: {form.error}
			</p>
		{/if}

		<form
			method="POST"
			use:enhance={enhanceCallback}
		>
			<Input
				title="*Name of the attraction"
				id="event-title"
				name="title"
				autofocus={true}
				maxlength={64}
				placeholder="Title of the attraction, e.g. La Mer beach."
				class="mb-4"
				externalError={form?.missingTitle && "The title is missing"}
			/>

			<Textarea
				title="*Description of the attraction"
				placeholder="Provide the description here, you can paste it from somewhere else or describe in your own words."
				id="event-description"
				name="description"
				maxlength={2048}
				class="mb-4"
				externalError={form?.shortDescription &&
					"The description is too short, minimum is 20 characters"}
			/>

			<Input
				title="Does it has an official website?"
				id="event-link"
				name="linkToWebsite"
				maxlength={128}
				placeholder="It would be handy if you searched for it."
				class="mb-4"
			/>

			<AddressPicker
				externalError={form?.missingAddress && "The address is missing"}
			/>

			<LocationPicker title="Could you point to the location(s) on the map?" />

			<TimeRangePicker
				title="*What's the best time to visit?"
				externalError={form?.missingDate && "Something wrong with the dates"}
			/>

			<Textarea
				title="Provide specific requirements if there are any"
				placeholder="For example, you need to pre-register online and be in shoes."
				id="event-requirements"
				name="requirements"
				maxlength={512}
				class="mb-4"
			/>

			<TogglerLink
				title="Do you need to register to visit it?"
				secondTitle="Provide the link to the registration."
				inputPlaceholder="Paste a link to the registration form."
				inputId="event-registration-link"
				optionOneText="Yes"
				optionTwoText="No"
				name="isRegistrationNeeded"
				inputName="registrationLink"
			/>

			<TogglerLink
				title="Is that a free-to-visit attraction?"
				secondTitle="How much does it cost?"
				inputPlaceholder="Specify AED or USD."
				inputId="event-cost"
				isInputChecked={true}
				optionOneText="Yes"
				optionTwoText="No"
				name="isEventFree"
				inputName="price"
			/>

			<Input
				title="Paste image preview link ('copy image URL' or 'Open image in new tab' and copy the URL)"
				id="event-image"
				name="imgSrc"
				maxlength={256}
				placeholder="Find some nice image."
				class="mb-4"
				bind:value={imgPreview}
			/>

			{#if imgPreview}
				<p class="lowercase text-sm mb-2">Image preview</p>

				<img
					src={imgPreview}
					alt="Preview of a picture from external site"
					class="mb-4"
				/>
			{/if}

			<Input
				title="Who is hosting this attraction?"
				id="event-host"
				name="hostName"
				maxlength={32}
				placeholder="Will be important in the future."
				class="mb-4"
			/>

			<CategoryPicker
				title="Pick a category for this attraction (multiple allowed)"
				list={attractionCategoryList}
				bind:pickedList
			/>

			<PrimaryButton
				title="Submit"
				class="mt-8"
			/>
		</form>
	{/if}
</section>
