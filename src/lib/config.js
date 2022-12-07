export const categoryList = [
	"food",
	"music",
	"movie",
	"tech",
	"sports",
	"wellbeing",
	"national",
	"performance",
	"learning",
	"science",
	"cars",
	"nature",
	"with kids",
	"with pets",
];

export const timeOptions = [
	"unknown",
	"less than 30 minutes",
	"between 30 minutes and 2 hours",
	"between 2 hours and 4 hours",
	"more than 4 hours",
];

export const timeOptionsToMinutes = {
	"": 120,
	"unknown": 120,
	"less than 30 minutes": 30,
	"between 30 minutes and 2 hours": 120,
	"between 2 hours and 4 hours": 240,
	"more than 4 hours": 480,
};

export const appConfig = {
	firstResultsLimit: 15,
	moreResultsLimit: 10,
};
