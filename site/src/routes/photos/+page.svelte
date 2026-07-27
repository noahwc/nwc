<script lang="ts">
	import Gallery from '../../components/gallery.svelte';

	let { data } = $props();
</script>

<h1>Pictures</h1>
<Gallery items={data.items} />
