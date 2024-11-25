<script>
	import { readableDateTransform } from '$lib/utils/utils';

	export let data;

	const date_string = readableDateTransform(data.date || '');
</script>

<article>
	<h1>{data.title}</h1>
	<p class="description">Published: {date_string}</p>
	<br />
	<svelte:component this={data.body} />
</article>

<style>
	.description {
		color: var(--text-soft);
	}
</style>
