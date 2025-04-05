<script>
	import '$lib/css/base.css';
	import Header from '../components/header.svelte';
	const { children } = $props();
</script>

<div class="container light">
	<Header />

	{@render children()}
</div>

<style>
	.container {
		width: min(900px, 100%);
		margin: auto;
		min-height: 100vh;
		padding: 0 var(--space-x-large);
		box-sizing: border-box;
	}
</style>
