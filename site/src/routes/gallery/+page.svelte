<script>
	import { onMount } from 'svelte';
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import 'photoswipe/style.css';
	const galleryID = 'test';
	export let data;

	onMount(() => {
		let lightbox = new PhotoSwipeLightbox({
			gallery: '#' + galleryID,
			children: 'a',
			pswpModule: () => import('photoswipe')
		});
		lightbox.init();
	});
</script>

<div class="pswp-gallery gallet-list" id={galleryID}>
	{#each data.posts as image}
		<a
			href={image.meta.url}
			data-pswp-width={400}
			data-pswp-height={400}
			target="_blank"
			rel="noreferrer"
		>
			<img src={image.meta.url} alt={image.meta.title} />
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

	img {
		display: block;
		min-width: 300px;
		max-width: max(700px, 100%);
		height: auto;
	}
</style>
