<script>
	let customClass = "";
	export { customClass as class };
	export let number = 0;
	export let isAdditionalText = false;
</script>

{#if number !== 0}
	<div class="flex items-center {customClass}">
		<div class="mr-2 flex">
			<img
				src="/face1.png"
				class="w-5 h-5"
				alt="portrait of AI generated human"
			/>
			{#if number >= 2}
				<img
					src="/face2.png"
					class="w-5 h-5 -ml-2"
					alt="portrait of AI generated human"
				/>
			{/if}
			{#if number >= 3}
				<img
					src="/face3.png"
					class="w-5 h-5 -ml-2"
					alt="portrait of AI generated human"
				/>
			{/if}
		</div>
		<p class="font-medium text-stone-500">
			{#if number === 1}
				{#if isAdditionalText}
					{number} is going, are you?
				{:else}
					{number} is going
				{/if}
			{:else if isAdditionalText}
				{number} are going, are you?
			{:else}
				{number} are going
			{/if}
		</p>
	</div>
{/if}
