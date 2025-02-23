<script lang="ts">
	import '../app.css';
	import M3Style from '$lib/components/M3Style.svelte';

	import { page } from '$app/state';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { Button } from 'm3-svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>JustTrack</title>
</svelte:head>

<M3Style />

<nav class="flex flex-row items-center justify-between gap-2 p-4">
	<a href="/" class="text-xl">JustTrack</a>
	<div class="flex flex-row items-center gap-2">
		{#if page.data.session}
			{#if page.data.session.user?.image}
				<img src={page.data.session.user.image} class="w-8 rounded-full" alt="User Avatar" />
			{/if}
			<Button type="filled" on:click={() => signOut()}>Sign out</Button>
		{:else}
			<Button type="filled" on:click={() => signIn('github')}>Sign in</Button>
		{/if}
	</div>
</nav>

<main class="mx-auto max-w-[900px] p-4">
	{@render children()}
</main>
