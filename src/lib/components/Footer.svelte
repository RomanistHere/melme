<script>
	import TextLink from "$lib/components/ui/TextLink.svelte";
</script>

<footer class="flex justify-between bg-slate-400/25 -mx-4 p-4">
	<div>
		<p class="py-0.5">
			Created by
			<TextLink
				title="RomanistHere"
				href="https://romanisthere.github.io/"
			/>
		</p>
		<p class="py-0.5">
			For
			<TextLink
				href="https://www.reddit.com/r/dubai/comments/z68pza/i_want_to_make_a_free_events_in_dubai_appsite_but/"
				title="reddit community"
			/>
		</p>
		<p class="py-0.5">All rights reserved © 2022</p>
	</div>
	<div class="text-right">
		<TextLink
			class="block py-0.5"
			href="articles/terms-of-use"
			title="Terms of use"
		/>
		<TextLink
			class="block py-0.5"
			href="articles/privacy-policy"
			title="Privacy policy"
		/>
		<TextLink
			class="block py-0.5"
			href="mailto:romanisthere@pm.me"
			title="Email us"
		/>
	</div>
</footer>
