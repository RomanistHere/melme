import { json } from "@sveltejs/kit";
import sharp from "sharp";

export async function POST({ request }) {
	const { name, data } = await request.json();
	try {
		await sharp(Buffer.from(data, "base64"))
			.resize(460)
			.webp()
			.toFile(`./public/submittedImages/${name}.webp`);
	} catch (err) {
		console.log(err);
	}

	return json({
		status: 201,
		body: JSON.stringify({
			src: name,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});
}
