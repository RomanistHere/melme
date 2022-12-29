export const rateLimitCheck = (usageTimesLimitation, Scheme) => async ip => {
	try {
		const userRateLimit = await Scheme.findOne({
			ip,
		});

		const isOverLimit = userRateLimit?.uses >= usageTimesLimitation;
		const uses = userRateLimit?.uses + 1 || 0;

		if (userRateLimit) await Scheme.findOne({ ip }).remove();

		await new Scheme({
			ip,
			uses,
			createdAt: new Date(),
		}).save();

		return {
			isError: false,
			isOverLimit,
			message: "updated",
		};
	} catch (error) {
		return { isError: true, message: error };
	}
};
