const mapboxToken = "pk.eyJ1Ijoicm9tYW5pc3RoZXJlIiwiYSI6ImNrc3E2cjYyMTA5eXkyeG5xZXpkcTI0dnUifQ.Bm8W-u4ylJZTzs3sNFu91w";

export const getGeoSuggestions = async text => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${mapboxToken}`;

	return await fetch(url);
};

export const getAddressBackUp = async (lat, lng) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}`;

	return await fetch(url);
};