<script lang="ts">
	let { data } = $props();
</script>

<div class="album-list">
	{#each data.albums as album (album.meta.title)}
		<a href={album.path} class="album-entry" aria-label={`${album.meta.title} album entry`}>
			<enhanced:img
				class="img"
				src={album.meta.cover}
				alt={album.meta.title}
				sizes="(min-width: 768px) 700px, 100vw"
			/>
			<p>{album.meta.title}</p>
		</a>
	{/each}
</div>

<style>
	.album-list {
		list-style: none;
		padding-left: 0;
		display: flex;
		flex-flow: row wrap;
		gap: var(--space-x-large);
	}

	.album-entry {
		display: flex;
		align-items: end;
		flex-direction: column;
		gap: var(--space-x-small);

		p {
			font-size: var(--font-size-large);
			margin: 0;
		}

		&:nth-child(even) {
			margin-left: auto;
		}
	}

	.img {
		display: block;
		min-width: 300px;
		max-width: 700px;
		height: auto;
	}
</style>
