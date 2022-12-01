<script>
	import Input from "$lib/components/ui/Input.svelte";
	import Textarea from "$lib/components/ui/Textarea.svelte";
	import DatePicker from "$lib/components/ui/DatePicker.svelte";
	import TimePicker from "$lib/components/ui/TimePicker.svelte";
	import TogglerLink from "./TogglerLink.svelte";
</script>

<form action="" class="max-w-2xl mx-auto py-12">
	<Input
		title="Name of the event"
		id="event-title"
		autofocus={true}
		maxlength={64}
		placeholder="Type here title of the event, e.g. Rally cars showcase."
		class="mb-4"
	/>

	<Textarea
		title="Description of the event"
		placeholder="Provide the description here, you can paste the original one or describe in your own words."
		id="event-description"
		maxlength={512}
		class="mb-4"
	/>

	<Input
		title="Link to the event from an official source"
		id="event-link"
		maxlength={128}
		placeholder="Find the trustworthy source. Where did you hear it from?"
		class="mb-4"
	/>

	<Input
		title="Address"
		id="event-address"
		maxlength={64}
		placeholder="Please, type 'not specified' in case the address is unknown."
		class="mb-4"
	/>

	<DatePicker
		title="Pick a date or a set of dates"
		class="mb-4"
	/>

	<TimePicker title="Pick a time" class="mb-4" />

	<Textarea
		title="Provide specific requirements if there are any"
		placeholder="For example, you need to pre-register online and be in shoes."
		id="event-description"
		maxlength={512}
		class="mb-4"
	/>

	<TogglerLink
		title="Do you need to register for this event?"
		secondTitle="Provide the link to the registration."
		optionOneText="Yes"
		optionTwoText="No"
	/>

	<p class="lowercase text-sm mb-2">
		Pick a category for this event (not ready)
	</p>
</form>
