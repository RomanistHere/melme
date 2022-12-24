const loadImages = (urls, callback) => {
	const makeCallback = name =>
		(err, image) => {
			loadedImages = {
				...loadedImages,
				[name]: err ? null : image,
			};
			// if all images are loaded, call the callback
			if (Object.keys(loadedImages).length === Object.keys(urls).length) {
				callback(loadedImages);
			}
		};
	if (Object.keys(loadedImages).length === Object.keys(urls).length) {
		callback(loadedImages);
		return;
	}
	for (const name in urls) {
		map.loadImage(urls[name], makeCallback(name));
	}
};