<script>
	import '$lib/css/base.css';
	const { children } = $props();
</script>

<div class="container">
	<nav>
		<a href="/">Home</a>
		<a href="/blog">Blog</a>
		<a href="/gallery">Pictures</a>
		<a href="/about">About</a>
	</nav>

	{@render children()}
</div>

<style>
	.container {
		width: min(700px, 100%);
		margin: auto;
		min-height: 100vh;
	}
</style>
