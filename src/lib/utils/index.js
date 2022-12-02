export const truncateString = (string, limit) => {
	if (string.length > limit) {
		return `${string.substring(0, limit)}...`;
	} else {
		return string;
	}
};

export const generateRandomString = () =>
	Math.random().toString(16).slice(2);
