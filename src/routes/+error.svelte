<script>
	import { page } from "$app/stores";
	import Seo from "$lib/components/Seo.svelte";
</script>

<Seo title="Error! But don't you worry, everything is okay!" />

<section>
	<h1 class="text-xl mb-12 mt-12">Unexpected things happen...</h1>

	<p>Status: {$page.status}</p>
	<p>Message: {$page.error.message}</p>

	{#if $page.status === 404}
		<p class="mt-8 my-2">
			Something went wrong and the page you are looking for is not here. But we
			can't sit crying all day about it, can we?
		</p>
		<p class="my-2">
			Let's get back to the
			<a
				href="/"
				class="underline"
			>
				main page
			</a>
			and find something else to do. There are a lot of options!
		</p>
	{:else}
		<p class="mt-8">
			We can't say what exactly happened, but something went wrong. Try to
			return to the moment when it was working and/or refresh the page. It might
			help. If not, issue is big and we most likely are already on our way to
			fix it. Don't you worry, we'll be right back :)
		</p>
	{/if}

	<p class="my-8">
		Here's a way to contact us if there's an emergency: <a
			href="mailto:romanisthere@pm.me"
			class="underline"
		>
			RomanistHere@pm.me
		</a>
	</p>
</section>
