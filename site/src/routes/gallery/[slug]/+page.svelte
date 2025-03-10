<script>
	import { readableDateTransform } from '$lib/utils/utils';

	export let data;

	const date_string = readableDateTransform(data.date || '');
</script>

<article>
	<img
		src={`${data.url}?w=1280;640;400`}
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
	img {
		display: block;
		width: 100%;
		height: auto;
		max-height: 95vh;
	}

	p {
		text-align: end;
	}

	:global(p > p) {
		display: contents;
	}
</style>
