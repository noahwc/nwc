<script lang="ts">
	let { data } = $props();
	const { photo, galleries, dateLabel } = data;
</script>

<article class="full-width">
	<enhanced:img
		class="img"
		src={photo.url}
		alt={photo.title}
		sizes="(min-width: 768px) 700px, 100vw"
	/>

	<div class="caption">
		<strong>{photo.title}</strong>
		{#if dateLabel}<br />{dateLabel}{/if}
		{#if photo.description}<br />{photo.description}{/if}
		{#if galleries.length}
			<br />Galleries:
			{#each galleries as g, i (g.slug)}
				<a href={`/galleries/${g.slug}`}>{g.title}</a>{#if i < galleries.length - 1},
				{/if}
			{/each}
		{/if}
	</div>
</article>

<style>
	.full-width {
		width: 90vw;
		position: relative;
		left: 50%;
		margin-left: -45vw;
	}

	.img {
		width: 100%;
		height: auto;
		max-height: 90vh;
		object-fit: contain;
	}

	.caption {
		text-align: end;
		margin-top: var(--space-small);
	}
</style>
