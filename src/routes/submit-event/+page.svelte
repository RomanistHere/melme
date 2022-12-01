<script>
	import { enhance } from "$app/forms";

	import Input from "$lib/components/ui/Input.svelte";
	import Textarea from "$lib/components/ui/Textarea.svelte";
	import DatePicker from "$lib/components/ui/DatePicker.svelte";
	import TimePicker from "$lib/components/ui/TimePicker.svelte";
	import RadioButtons from "$lib/components/ui/RadioButtons.svelte";
	import TogglerLink from "./TogglerLink.svelte";
	import CategoryPicker from "./CategoryPicker.svelte";

	const timeOptions = [
		"I don't know",
		"less than 30 minutes",
		"between 30 minutes and 1 hour",
		"between 1 hour and 2 hours",
		"between 2 hours and 4 hours",
		"more than 4 hours",
		"whole day",
	];

	const categoryList = [
		"food",
		"music",
		"tech",
		"sports",
		"national",
		"learning",
		"science",
		"cars",
		"nature",
		"with kids",
		"with pets",
	];

	const enhanceCallback = ({ data }) => {
		data.append("categories", JSON.stringify(pickedList));
	};

	let pickedList = [];
</script>

<svelte:head>
	<title>Submit an event.</title>
</svelte:head>

<section class="max-w-2xl mx-auto py-12 px-4">
	<h1 class="mb-8 text-2xl">
		To submit an event, please, fill all the necessary
		fields marked with *
	</h1>

	<form
		method="POST"
		use:enhance={enhanceCallback}
	>
		<Input
			title="*Name of the event"
			id="event-title"
			name="title"
			autofocus={true}
			maxlength={64}
			placeholder="Type here title of the event, e.g. Rally cars showcase."
			class="mb-4"
		/>

		<Textarea
			title="*Description of the event"
			placeholder="Provide the description here, you can paste the original one or describe in your own words."
			id="event-description"
			name="description"
			maxlength={512}
			class="mb-4"
		/>

		<Input
			title="*Link to the event from an official source"
			id="event-link"
			name="linkToEvent"
			maxlength={128}
			placeholder="Find the trustworthy source. Where did you hear it from?"
			class="mb-4"
		/>

		<Input
			title="*Address"
			id="event-address"
			name="address"
			maxlength={128}
			placeholder="Please, type 'not specified' in case the address is unknown."
			class="mb-4"
		/>

		<DatePicker
			title="*Pick a date or a set of dates"
			class="mb-4"
			name="date"
		/>

		<TimePicker
			title="*Pick a time when it starts"
			class="mb-4"
			name="time"
		/>

		<RadioButtons
			title="Do you know how long it will be?"
			id="event-duration"
			name="duration"
			options={timeOptions}
			class="mb-4"
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
			title="Do you need to register for this event?"
			secondTitle="Provide the link to the registration."
			inputPlaceholder="Paste a link to the registration form."
			inputId="event-registration-link"
			optionOneText="Yes"
			optionTwoText="No"
			name="isRegistrationNeeded"
			inputName="registrationLink"
		/>

		<TogglerLink
			title="Is that a free-to-enter event?"
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
			placeholder="Please, type 'not specified' in case the address is unknown."
			class="mb-4"
		/>

		<CategoryPicker
			title="Pick a category for this event (multiple allowed)"
			list={categoryList}
			bind:pickedList
		/>

		<button class="input-border mt-16 w-full">
			Submit
		</button>
	</form>
</section>
