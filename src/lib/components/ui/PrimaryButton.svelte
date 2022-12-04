<script>
	let customClass = "";
	export { customClass as class };
	export let title;
	export let disabled = false;
</script>

<button
	on:click
	class="bg-indigo-700 font-regular text-white rounded-xl p-3 block w-full my-4 {customClass}"
	class:bg-emerald-500={disabled}
>
	{title}
</button>
