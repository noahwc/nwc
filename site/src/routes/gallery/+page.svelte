<script>
	export let data;
</script>

<div class="gallet-list">
	<enhanced:img
		alt="test"
		src="/static/gallery/DSCF0967.jpg?w=1280;640;400"
		sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
	/>
	{#each data.posts as post}
		<a href={post.path}>
			<img src={post.meta.url} alt={post.meta.title} />
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
