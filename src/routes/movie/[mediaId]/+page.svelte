<script lang="ts">
	import Container from '$lib/components/media/Container.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const movie = data.movie;
</script>

<svelte:head>
	<title>{movie.title} | JustTrack</title>
</svelte:head>

<Container {movie} />
