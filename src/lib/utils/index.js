import { goto } from "$app/navigation";

export const truncateString = (string, limit) => {
	if (!string) return string;
	if (string.length > limit) {
		return `${string.substring(0, limit)}...`;
	} else {
		return string;
	}
};

export const generateRandomString = () => Math.random().toString(16).slice(2);

export const handleClickBack = () => {
	goto("/");
};

export const getToday = () => new Date().toLocaleDateString("en-CA");

export const convertLocalDateToUTCIgnoringTimezone = date => {
	const timestamp = Date.UTC(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
		date.getMilliseconds()
	);

	return new Date(timestamp);
};

export const convertUTCToLocalDateIgnoringTimezone = utcDate => new Date(
		utcDate.getUTCFullYear(),
		utcDate.getUTCMonth(),
		utcDate.getUTCDate(),
		utcDate.getUTCHours(),
		utcDate.getUTCMinutes(),
		utcDate.getUTCSeconds(),
		utcDate.getUTCMilliseconds()
	);

export const getDateHumanFormat = dateStr => {
	const dateObj = new Date(dateStr);
	const options = {
		month: "short",
		day: "numeric",
	};

	return dateObj.toLocaleDateString("en-UK", options);
};

export const getTimeHumanFormat = dateStr => {
	const dateObj = new Date(dateStr);
	const options = {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	};

	return dateObj.toLocaleTimeString("en-US", options);
};

export const sortDateByClosest = datesArray => {
	if (datesArray.length === 1) return datesArray;

	const today = new Date();
	return datesArray.sort((a, b) => {
		const distanceA = Math.abs(today - a);
		const distanceB = Math.abs(today - b);
		return distanceA - distanceB;
	});
};

export const getClosestDateToNow = datesArray => {
	if (datesArray.length === 1) return datesArray[0];

	const today = convertUTCToLocalDateIgnoringTimezone(new Date(getToday()));
	const sortedArr = sortDateByClosest(datesArray);

	// const beforeDates = sortedArr.filter(d => d - today < 0);
	const afterDates = sortedArr.filter(d => d - today > 0);

	return afterDates[0];
};
