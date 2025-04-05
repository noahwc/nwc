<script>
	export let data;
</script>

<div class="gallery-list">
	{#each data.posts as post}
		<a href={post.path} class="gallery-entry" aria-label={`${post.meta.title} gallery entry`}>
			<enhanced:img
				class="img"
				src={post.meta.url}
				alt={post.meta.title}
				sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
			/>
			<p>{post.meta.title}</p>
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

		p {
			margin: 0;
		}

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
