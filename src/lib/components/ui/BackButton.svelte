<script>
	import ArrowLeft from "$lib/components/icons/ArrowLeft.svelte";

	import { handleClickBack } from "$lib/utils/index.js";
</script>

<a
	href="/"
	on:click|preventDefault={handleClickBack}
	class="p-3 block"
>
	<ArrowLeft />
</a>
