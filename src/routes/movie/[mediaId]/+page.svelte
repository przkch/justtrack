<script lang="ts">
	import Container from '$lib/components/media/Container.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const movie = data.movie;
</script>

<Container {movie} />
