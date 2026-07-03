<!-- reuseable gallery goes here so it can be used in albums and the photos feed -->

<script lang="ts">
	import type { Post } from '../app';

	interface GalleryProps {
		items: Post[];
	}

	let { items }: GalleryProps = $props();
</script>

<div class="gallery-list">
	{#each items as item (item.meta.url)}
		{#if item.path !== '#'}
			<a href={item.path} class="gallery-entry" aria-label={`${item.meta.title} gallery entry`}>
				{#if item.meta.url}
					<enhanced:img
						class="img"
						src={item.meta.url}
						alt={item.meta.title as string}
						sizes="(min-width: 768px) 700px, 100vw"
					/>
				{:else}
					<div class="error-message">Image not available</div>
				{/if}
			</a>
		{:else}
			<div class="gallery-entry" aria-label={`${item.meta.title} gallery entry`}>
				{#if item.meta.url}
					<enhanced:img
						class="img"
						src={item.meta.url}
						alt={item.meta.title as string}
						sizes="(min-width: 768px) 700px, 100vw"
					/>
				{:else}
					<div class="error-message">Image not available</div>
				{/if}
			</div>
		{/if}
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
		gap: var(--space-large);

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

	.error-message {
		text-align: center;
		padding: 2rem;
		background-color: #f8f8f8;
		border-radius: 4px;
		color: #666;
		min-width: 300px;
		max-width: 700px;
	}
</style>
