<script>
	let customClass = "";
	export { customClass as class };
	export let title;
	export let disabled = false;
</script>

<button
	on:click
	class="bg-gray-100 font-regular text-indigo-700 rounded-xl p-3 block w-full my-4 {customClass}"
	class:opacity-50={disabled}
	class:text-black={disabled}
>
	{title}
</button>
