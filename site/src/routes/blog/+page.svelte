<script>
	export let data;
</script>

<h1>Blog</h1>

<p>Some things I wrote</p>
<br />
<ul>
	{#each data.posts as post (post.meta.title)}
		<li>
			<a href={post.path}>
				{post.meta.title}
			</a>
			{#if post.meta.description}
				<br />
				{post.meta.description}
			{/if}
			<br />
			<span class="post-date">Published {post.meta.date}</span>
		</li>
	{/each}
</ul>

<style>
	.post-date {
		color: var(--text-soft);
		font-size: var(--text-size-small);
	}

	ul {
		list-style: none;
		padding-left: 0;
	}

	li {
		margin: var(--space-medium) 0;
		font-size: var(--header-two-size);
	}
</style>
