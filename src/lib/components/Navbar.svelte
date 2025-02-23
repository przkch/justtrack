<script lang="ts">
	import { page } from '$app/state';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { Button } from 'm3-svelte';
</script>

<nav
	class="m3-container sticky top-4 mx-auto flex max-w-[900px] flex-row items-center justify-between gap-2 rounded-xl p-2"
>
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
