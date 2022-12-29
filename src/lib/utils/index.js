import { goto } from "$app/navigation";
import { modalState } from "$lib/stores/index.js";

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

export const convertUTCToLocalDateIgnoringTimezone = utcDate =>
	new Date(
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
	const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

	const sorted = datesArray.sort((a, b) => {
		const distanceA = Math.abs(today - a);
		const distanceB = Math.abs(today - b);
		return distanceA - distanceB;
	});

	// remove times that were before yesterday
	return sorted.filter(d => d - yesterday > 0);
};

export const convertTimesToUTC = timesArr =>
	timesArr.map(convertUTCToLocalDateIgnoringTimezone);

export const sortByDateAndTime = objects => {
	const sortWithinObj = objects.map(item => ({
		...item,
		times: [...sortDateByClosest(convertTimesToUTC(item.times))],
	}));

	// todo: extend sorting to show live events first based on duration
	// todo: also if the same event is repeated for example at 15:00 and 16:00
	// todo: and duration is 45 min, at 15:30-15:45 it should still display "live" version
	const today = new Date();
	const sorted = sortWithinObj.sort((a, b) => {
		const distanceA = Math.abs(today - a.times[0]);
		const distanceB = Math.abs(today - b.times[0]);
		return distanceA - distanceB;
	});

	return sorted;
};

export const getClosestDateToNow = datesArray => {
	if (datesArray.length === 1) return datesArray[0];

	const today = convertUTCToLocalDateIgnoringTimezone(new Date(getToday()));
	const sortedArr = sortDateByClosest(datesArray);

	// const beforeDates = sortedArr.filter(d => d - today < 0);
	const afterDates = sortedArr.filter(d => d - today > 0);

	return afterDates[0];
};

export const openOverlay = (openName, payload = null, closeName) => {
	if (closeName) {
		modalState.update(state => ({
			...state,
			[closeName]: {
				active: false,
				payload: null,
			},
		}));
	}

	modalState.update(state => ({
		...state,
		[openName]: {
			active: true,
			payload,
		},
	}));
};

export const closeOverlay = name => openOverlay(null, null, name);

export const showError = error => {
	// eslint-disable-next-line no-alert
	alert(error);
};

export const getCategoryFromParams = searchParams => {
	try {
		const arrayOfParams = searchParams.get("categories").split("-");

		if (!arrayOfParams) return null;
		// when we leave empty category in url, it will return "", so we check for it
		return arrayOfParams.length === 1 && arrayOfParams[0] === ""
			? null
			: arrayOfParams;
	} catch (err) {
		return null;
	}
};

export const roundToSixthDecimal = number =>
	Math.round(100000 * number) / 100000;

export const logError = err =>
	// eslint-disable-next-line no-console
	console.log(err);
