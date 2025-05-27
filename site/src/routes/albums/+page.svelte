<script>
	export let data;
</script>

<div class="album-list">
	{#each data.albums as album}
		<a href={album.path} class="album-entry" aria-label={`${album.meta.title} album entry`}>
			<enhanced:img
				class="img"
				src={album.meta.cover}
				alt={album.meta.title}
				sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
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
		flex-direction: row;
		flex-wrap: wrap;
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
