<script>
	export let data;
</script>

<div class="gallet-list">
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
