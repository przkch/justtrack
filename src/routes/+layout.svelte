<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>JustTrack</title>
	<script src="https://rybbit.przekichane.pl/api/script.js" data-site-id="3" defer></script>
</svelte:head>

<Navbar />

<main class="mx-auto min-h-[calc(100vh-10.6rem)] max-w-[900px] p-4">
	{@render children()}
</main>

<Footer />
