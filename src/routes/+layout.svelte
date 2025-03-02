<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import M3Style from '$lib/components/M3Style.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>JustTrack</title>
</svelte:head>

<M3Style />

<Navbar />

<main class="mx-auto min-h-[calc(100vh-10.6rem)] max-w-[900px] p-4">
	{@render children()}
</main>

<Footer />
