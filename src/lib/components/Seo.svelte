<script>
	export let title = "melme";
	export let description = "Best free events in Dubai";
	export let image;
</script>

<svelte:head>
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/>
	<meta
		name="format-detection"
		content="telephone=no"
	/>
	<link
		rel="me"
		href="mailto:romanisthere@pm.me"
	/>

	<!--	<meta http-equiv="Content-Security-Policy" content="-->
	<!--        base-uri 'self';-->
	<!--        connect-src 'self' {API_DOMAIN} plausible.io *.openstreetmap.org geocode-api.arcgis.com api.waqi.info en.wikipedia.org;-->
	<!--        default-src 'self';-->
	<!--        font-src 'self' data:;-->
	<!--        img-src 'self' *.openstreetmap.org data:;-->
	<!--        media-src 'self';-->
	<!--        script-src 'self' 'unsafe-inline' plausible.io;-->
	<!--        style-src 'self' 'unsafe-inline';-->
	<!--    "/>-->

	<meta
		name="description"
		content={description}
	/>
	<!--	<meta name="keywords" content={keywords} />-->
	<!--	<meta name="subject" content={subject} />-->

	<title>{title}</title>

	<meta
		property="og:site_name"
		content="melme"
	/>
	<meta
		property="og:locale"
		content="en"
	/>
	<!--	<meta property="og:url" content={url} />-->
	<meta
		property="og:type"
		content="website"
	/>
	<meta
		property="og:title"
		content={title}
	/>
	<meta
		property="og:description"
		content={description}
	/>
	{#if image}
		<meta
			property="og:image"
			content={image}
		/>
		<meta
			property="og:image:width"
			content="1200"
		/>
		<meta
			property="og:image:height"
			content="627"
		/>
		<meta
			property="og:image:alt"
			content="image preview"
		/>
	{:else}
		<meta
			property="og:image"
			content="https://melme.io/logo-192x192.png"
		/>
		<meta
			property="og:image:width"
			content="400"
		/>
		<meta
			property="og:image:height"
			content="400"
		/>
		<meta
			property="og:image:alt"
			content="melme logo"
		/>
	{/if}

	<meta
		name="twitter:card"
		content={image ? "summary" : "summary_large_image"}
	/>

	<meta
		name="twitter:creator"
		content={"@RomanistHere"}
	/>
	<meta
		name="twitter:site"
		content={"@RomanistHere"}
	/>
	{#if image}
		<meta
			name="twitter:image"
			content={image}
		/>
	{:else}
		<meta
			name="twitter:image"
			content="https://melme.io/logo-192x192.png"
		/>
	{/if}
</svelte:head>
