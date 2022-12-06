<script>
	let fileInput;
	let files;
	let image;

	const getBase64 = image => {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = e => {
			console.log("loaded");
			image = e.target.result;
			uploadFunction(e.target.result);
		};
	};

	const uploadFunction = async imgBase64 => {
		const imgData = imgBase64.split(",");
		console.log(imgData)
		try {
			const repsonse = await fetch(`/api/uploadImage`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
				},
				body: JSON.stringify({
					data: imgData[1],
					name: "image1",
				}),
			});
			console.log(repsonse);
		} catch (e) {
			console.log(e);
		}
	};
</script>

<div class="container">
	{#if image}
		<img
			src={image}
			alt="avatar"
		/>
	{:else}
		<img
			src="https://romanisthere.github.io/e4b399a2f7c6db3bab9e1bef4733b0de.jpg"
			alt="avatar"
		/>
	{/if}
	<input
		class="hidden"
		id="file-to-upload"
		type="file"
		accept=".png,.jpg"
		bind:files
		bind:this={fileInput}
		on:change={() => getBase64(files[0])}
	/>
	<button
		class="upload-btn"
		on:click={() => fileInput.click()}
	>
		Upload
	</button>
</div>
