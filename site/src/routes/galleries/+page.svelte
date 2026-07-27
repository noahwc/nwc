<script lang="ts">
	let { data } = $props();
</script>

<h1>Galleries</h1>

<div class="gallery-list">
	{#each data.galleries as g (g.slug)}
		<a href={`/galleries/${g.slug}`} class="gallery-entry" aria-label={`${g.title} gallery`}>
			{#if g.cover}
				<enhanced:img
					class="img"
					src={g.cover}
					alt={g.title}
					sizes="(min-width: 768px) 700px, 100vw"
				/>
			{/if}
			<p>{g.title}</p>
		</a>
	{/each}
</div>

<style>
	.gallery-list {
		display: flex;
		flex-flow: row wrap;
		gap: var(--space-x-large);
	}

	.gallery-entry {
		display: flex;
		align-items: end;
		flex-direction: column;
		gap: var(--space-x-small);

		&:nth-child(even) {
			margin-left: auto;
		}

		p {
			font-size: var(--font-size-large);
			margin: 0;
		}
	}

	.img {
		display: block;
		min-width: 300px;
		max-width: 700px;
		height: auto;
	}
</style>
