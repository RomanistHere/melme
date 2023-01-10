<script>
	let customClass = "";
	export { customClass as class };
	export let isActive = false;
</script>

<button
	class="absolute flex justify-center items-center {customClass}"
	aria-label="like button"
	on:click
>
	<span
		class="rounded-full bg-white w-7 h-7 flex justify-center items-center block"
	>
		<svg
			class="mt-px"
			width="19"
			height="16"
			viewBox="0 0 19 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M9.5 15C9.39473 15.0006 9.29037 14.9798 9.19292 14.9389C9.09546 14.8979 9.00682 14.8375 8.93208 14.7612L2.71691 8.35393C1.9373 7.54287 1.5 6.44787 1.5 5.30678C1.5 4.1657 1.9373 3.0707 2.71691 2.25965C3.50261 1.45299 4.56692 1 5.67651 1C6.7861 1 7.85041 1.45299 8.63612 2.25965L9.5 3.14908L10.3639 2.25965C11.1496 1.45299 12.2139 1 13.3235 1C14.4331 1 15.4974 1.45299 16.2831 2.25965C17.0627 3.0707 17.5 4.1657 17.5 5.30678C17.5 6.44787 17.0627 7.54287 16.2831 8.35393L10.0679 14.7612C9.99318 14.8375 9.90454 14.8979 9.80709 14.9389C9.70963 14.9798 9.60527 15.0006 9.5 15Z"
				stroke={isActive ? "#FF8888" : "#9D9D9D"}
				fill={isActive ? "#FF8888" : null}
				stroke-width="2"
			/>
		</svg>
	</span>
</button>

<style>
	path {
		transition: all 0.2s;
	}
</style>
