<script>
	import Separator from "$lib/components/icons/Separator.svelte";

	let customClass = "";
	export { customClass as class };
	export let text1 = "happening now";
	export let text2 = "live";
</script>

<div
	class="overflow-hidden flex w-full border-y-2 border-black uppercase font-bold bg-white py-px {customClass}"
>
	<div class="flex anim items-center whitespace-nowrap">
		<span class="px-1">{text1}</span>
		<Separator />
		<span class="px-1">{text2}</span>
		<Separator />
		<span class="px-1">{text1}</span>
		<Separator />
		<span class="px-1">{text2}</span>
		<Separator />
	</div>
	<div class="flex anim items-center whitespace-nowrap">
		<span class="px-1">{text1}</span>
		<Separator />
		<span class="px-1">{text2}</span>
		<Separator />
		<span class="px-1">{text1}</span>
		<Separator />
		<span class="px-1">{text2}</span>
		<Separator />
	</div>
</div>

<style>
	.anim {
		animation: marquee 10s linear infinite;
	}

	@keyframes marquee {
		0% {
			transform: translate3d(0, 0, 0);
		}

		100% {
			transform: translate3d(-100%, 0, 0);
		}
	}
</style>
