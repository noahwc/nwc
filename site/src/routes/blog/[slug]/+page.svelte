<script lang="ts">
	import { readableDateTransform } from '$lib/utils/utils';

	let { data } = $props();

	const date_string = readableDateTransform(data.date || '');
	const Body = data.body;
</script>

<article>
	<h1>{data.title}</h1>
	<p class="description">Published: {date_string}</p>
	<br />
	<Body />
</article>

<style>
	.description {
		color: var(--text-soft);
	}
</style>
