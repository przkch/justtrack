<script lang="ts">
	import Container from '$lib/components/media/Container.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const tv = data.tv;
</script>

<svelte:head>
	<title>{tv.name} | JustTrack</title>
</svelte:head>

<Container {tv} />
