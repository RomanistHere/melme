const getDynamicSlugs = async () => {
	const res = await fetch("https://melme.io/api/sitemapSlugs");
	return await res.json();
};

const getStaticSlugs = async () => {
	const imports = import.meta.glob("../articles/**/*.md");
	const body = [];

	for (const path in imports) {
		body.push(
			imports[path]().then(({ metadata }) => ({
				slug: path.substring(3).slice(0, -3),
			}))
		);
	}
	return await Promise.all(body);
};

export async function GET() {
	const { error, events, attractions } = await getDynamicSlugs();
	const posts = await getStaticSlugs();

	return new Response(
		`
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
		xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
		xmlns:xhtml="https://www.w3.org/1999/xhtml"
		xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
		xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
		xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
		xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >

	<url>
		<loc>https://melme.io</loc>
		<changefreq>daily</changefreq>
		<priority>1</priority>
	</url>
	<url>
		<loc>https://melme.io/attractions</loc>
		<changefreq>daily</changefreq>
		<priority>0.7</priority>
	</url>
	
	${!error && events
		.map(
			({ slug }) =>
				`
				<url>
					<loc>https://melme.io/events/${slug}</loc>
					<changefreq>daily</changefreq>
					<priority>0.7</priority>
				</url>
      			`
		)
		.join("")}
	
	${!error && attractions
		.map(
			({ slug }) =>
				`
				<url>
					<loc>https://melme.io/attractions/${slug}</loc>
					<changefreq>weekly</changefreq>
					<priority>0.7</priority>
				</url>
      			`
		)
		.join("")}
	
	${posts
		.map(
			({ slug }) =>
				`
				<url>
					<loc>https://melme.io/${slug}</loc>
					<changefreq>weekly</changefreq>
					<priority>0.7</priority>
				</url>
      			`
		)
		.join("")}

    </urlset>`.trim(),
		{
			headers: {
				"Content-Type": "application/xml",
			},
		}
	);
}
