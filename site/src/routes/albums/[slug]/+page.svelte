<script lang="ts">
	import Gallery from '../../../components/gallery.svelte';

	let { data } = $props();
</script>

<Gallery items={data.posts} />
