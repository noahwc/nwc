<script>
	import { readableDateTransform } from '$lib/utils/utils';

	export let data;
	const date_string = readableDateTransform(data.date || '');
</script>

<article class="full-width">
	<enhanced:img
		class="img"
		src={data.url}
		alt={data.title}
		sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
	/>
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

	:global(p > p) {
		display: contents;
	}
</style>
