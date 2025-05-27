<!-- reuseable gallery goes here so it can be used in albums and the photos feed -->

<script lang="ts">
	interface GalleryProps {
		items: [
			{
				meta: {
					title: string;
					url: string;
				};
				path: string;
			}
		];
	}

	let { items }: GalleryProps = $props();
</script>

<div class="gallery-list">
	{#each items as item}
		<a href={item.path} class="gallery-entry" aria-label={`${item.meta.title} gallery entry`}>
			<enhanced:img
				class="img"
				src={item.meta.url}
				alt={item.meta.title}
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
		flex-direction: row;
		flex-wrap: wrap;
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
</style>
