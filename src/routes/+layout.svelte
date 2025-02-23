<script lang="ts">
	import '../app.css';
	import M3Style from '$lib/components/M3Style.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>JustTrack</title>
</svelte:head>

<M3Style />

<Navbar />

<main class="mx-auto max-w-[900px] p-4">
	{@render children()}
</main>
