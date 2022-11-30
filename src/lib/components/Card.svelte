<script>
	export let slug;
	export let title;
	export let description;
	export let address;
	export let imgSrc;
	export let tags;
	export let location;
	export let isApproved;
	export let upVotes;
	export let downVotes;
</script>

<a
	class="block p-4 my-2 border border-2 hover:border-emerald-600"
	href={slug}
>
	<img
		src={imgSrc}
		alt="Picture of event preview."
	>
	<h2 class="font-bold text-2xl">
		{title}
	</h2>
	<p>
		{description}
	</p>
	<p class="opacity-30">
		{address}
	</p>
</a>