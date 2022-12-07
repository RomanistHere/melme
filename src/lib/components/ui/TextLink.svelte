<script>
	let customClass = "";
	export { customClass as class };
	export let href = "/";
	export let title;
</script>

<a
	{href}
	class="underline {customClass}"
	on:click
>
	{title}
</a>
