<script lang="ts">
	import { page } from '$app/stores';

	interface NavItem {
		url: string;
		label: string;
	}

	const links: NavItem[] = [
		{ url: '/', label: 'Home' },
		{ url: '/blog', label: 'Blog' },
		{ url: '/gallery', label: 'Pictures' },
		{ url: '/about', label: 'About' }
	];
</script>

<nav>
	{#each links as link}
		<a class:active={$page.url.pathname === link.url} href={link.url}>{link.label}</a>
	{/each}
</nav>

<style>
	nav {
		display: flex;
		gap: var(--space-x-large);
		padding: var(--space-x-large) 0 var(--space-large);
		font-size: var(--text-size);
	}

	a.active {
		text-decoration: underline;
	}
</style>
