<script>
	let customClass = "";
	export { customClass as class };
	export let title;
</script>

<button
	on:click
	class="bg-indigo-700 font-regular text-white rounded-xl p-3 block w-full my-4 {customClass}"
>
	{title}
</button>
