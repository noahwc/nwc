<script lang="ts">
	import Gallery from '../../../components/gallery.svelte';
	import type { GalleryThumb } from '../../../app';

	let { data } = $props();
	const items: GalleryThumb[] = data.items;
</script>

<article class="gallery-header">
	<h1>{data.title}</h1>
	{#if data.description}<p>{data.description}</p>{/if}
</article>

<Gallery {items} />

<style>
	.gallery-header {
		max-width: 700px;
		margin: 0 auto 2rem;
		text-align: center;
	}
</style>
