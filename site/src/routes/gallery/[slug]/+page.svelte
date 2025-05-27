<script>
	import { readableDateTransform } from '$lib/utils/utils';

	export let data;
	const date_string = readableDateTransform(data.date || '');

	console.log(data);
</script>

<article class="full-width">
	{#if data.url}
		<enhanced:img
			class="img"
			src={data.url}
			alt={data.title}
			sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
		/>
	{:else}
		<p class="error-message">Image not available</p>
	{/if}
	<br />
	<p>
		<strong>{data.title}</strong>
		<br />
		<svelte:component this={data.body} />
		<br />
		{date_string}
	</p>
</article>

<style>
	.full-width {
		width: 90vw;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -45vw;
		margin-right: -45vw;
	}

	img {
		width: 100%;
		height: auto;
		display: block;
		max-height: 90vh;
	}

	p {
		text-align: end;
	}

	.error-message {
		text-align: center;
		padding: 2rem;
		background-color: #f8f8f8;
		border-radius: 4px;
		color: #666;
	}

	:global(p > p) {
		display: contents;
	}
</style>
