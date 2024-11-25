<script>
	import { readableDateTransform } from '$lib/utils/utils';

	export let data;

	const date_string = readableDateTransform(data.date || '');
</script>

<article>
	<img src={data.url} alt={data.title} />
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
