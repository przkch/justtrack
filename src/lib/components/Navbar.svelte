<script lang="ts">
	import UserAvatar from '$lib/components/misc/UserAvatar.svelte';

	import { page } from '$app/state';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { Button } from 'm3-svelte';

	const session = page.data.session;
</script>

<nav
	class="m3-container sticky top-4 mx-auto flex max-w-[900px] flex-row items-center justify-between gap-2 rounded-xl p-2"
>
	<a href="/" class="text-xl">JustTrack</a>
	<div class="flex flex-row items-center gap-2">
		{#if session}
			<UserAvatar />
			<Button type="filled" on:click={() => signOut()}>Sign out</Button>
		{:else}
			<Button type="filled" on:click={() => signIn('github')}>Sign in</Button>
		{/if}
	</div>
</nav>
