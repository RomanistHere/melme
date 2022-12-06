import { goto } from "$app/navigation";

export const truncateString = (string, limit) => {
	if (!string) return string;
	if (string.length > limit) {
		return `${string.substring(0, limit)}...`;
	} else {
		return string;
	}
};

export const generateRandomString = () =>
	Math.random().toString(16).slice(2);

export const handleClickBack = () => {
	goto("/");
};

export const sortByDateAndTime = array =>
	array.sort((objA, objB) => {
		if (objA.date < objB.date) return -1;
		else if (objA.date > objB.date) return 1;
		else if (objA.date === objB.date) {
			if (objA.time < objB.time) return -1;
			else if (objA.time > objB.time) return 1;
			else return 0;
		} else return 0;
	});
