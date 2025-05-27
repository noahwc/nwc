<script lang="ts">
	import { page } from '$app/stores';

	interface NavItem {
		url: string;
		label: string;
	}

	const links: NavItem[] = [
		{ url: '/', label: 'Home' },
		{ url: '/gallery', label: 'Pictures' },
		{ url: '/albums', label: 'Albums' },
		{ url: '/about', label: 'About' }
	];
</script>

<nav>
	{#each links as link (link.label)}
		<a class:active={$page.url.pathname === link.url} href={link.url}>{link.label}</a>
	{/each}
</nav>

<style>
	nav {
		display: flex;
		justify-content: center;
		gap: var(--space-x-large);
		padding: var(--space-x-large);
		font-size: var(--text-size);
	}

	a.active {
		text-decoration: underline;
	}
</style>
