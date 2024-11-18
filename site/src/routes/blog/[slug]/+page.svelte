<script>
	export let data;
</script>

<article>
	<h1>{data.title}</h1>
	<p class="description">Published: {data.date}</p>
	<br />
	<svelte:component this={data.body} />
</article>

<style>
	.description {
		color: var(--text-soft);
	}
</style>
