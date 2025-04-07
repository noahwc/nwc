<script>
	import Gallery from '../../../components/gallery.svelte';

	export let data;
</script>

<Gallery items={data.posts} />
