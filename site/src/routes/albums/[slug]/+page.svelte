<script lang="ts">
	import Gallery from '../../../components/gallery.svelte';
	import type { AlbumThumb } from '../../../app';

	let { data } = $props();
	const items: AlbumThumb[] = data.items;
</script>

<article class="album-header">
	<h1>{data.title}</h1>
	{#if data.description}<p>{data.description}</p>{/if}
</article>

<Gallery {items} />

<style>
	.album-header {
		max-width: 700px;
		margin: 0 auto 2rem;
		text-align: center;
	}
</style>
