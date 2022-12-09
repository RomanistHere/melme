<script>
	import createConversation from "@nlxchat/core";

	const config = {
		botUrl: "https://bots.dev.studio.nlx.ai/c/NanerGz2hNti5DzfpnzaT/I4MkYHG7sSZC5-NuIxCFL", // obtain from NLX deployments page
		headers: {
			"nlx-api-key": "kIldM3AzpA4uwGYXVaQJXCdKMu6J=M5s", // obtain from NLX deployments page
		},
		userId: "abcd-1234", // optional property to identify the user
		conversationId: "", // start with a specific conversation ID - useful if you want to resume a previous conversation
		context: {}, // context that is shared with the bot
		triggerWelcomeIntent: true, // set whether the welcome intent should trigger when the conversation is initialized
		languageCode: "es-US", // optional language code for standard bots that do not run on US English
	};

	const convo = createConversation(config);

	$: console.log($convo);

	convo.sendText("I dunno what to do");
</script>
