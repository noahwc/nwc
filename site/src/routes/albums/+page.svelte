<script lang="ts">
	let { data } = $props();
</script>

<h1>Albums</h1>

<div class="album-list">
	{#each data.albums as album (album.slug)}
		<a href={`/albums/${album.slug}`} class="album-entry" aria-label={`${album.title} album`}>
			{#if album.cover}
				<enhanced:img
					class="img"
					src={album.cover}
					alt={album.title}
					sizes="(min-width: 768px) 700px, 100vw"
				/>
			{/if}
			<p>{album.title}</p>
		</a>
	{/each}
</div>

<style>
	.album-list {
		display: flex;
		flex-flow: row wrap;
		gap: var(--space-x-large);
	}

	.album-entry {
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
