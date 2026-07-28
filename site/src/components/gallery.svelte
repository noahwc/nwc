<script lang="ts">
	import type { AlbumThumb } from '../app';

	let { items }: { items: AlbumThumb[] } = $props();
</script>

<div class="gallery-list">
	{#each items as item (item.href)}
		<a href={item.href} class="gallery-entry" aria-label={`${item.alt} photo`}>
			<enhanced:img
				class="img"
				src={item.url}
				alt={item.alt}
				sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
			/>
		</a>
	{/each}
</div>

<style>
	.gallery-list {
		list-style: none;
		padding-left: 0;
		display: flex;
		flex-flow: row wrap;
		gap: var(--space-large);
	}

	.gallery-entry {
		display: flex;
		align-items: end;

		&:nth-child(even) {
			flex-direction: row-reverse;
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
