<script lang="ts">
	import { ListItem, UnorderedList } from '$lib/components/m3';
	import UserAvatar from '$lib/components/misc/UserAvatar.svelte';

	import { page } from '$app/state';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { Button, Dialog } from 'm3-svelte';

	const session = page.data.session;

	let userDialogOpened = $state(false);
</script>

<Dialog bind:open={userDialogOpened} headline="JustTrack">
	<UnorderedList>
		<ListItem><a href="/watchlists" class="underline">Your watchlists</a></ListItem>
	</UnorderedList>

	<svelte:fragment slot="buttons">
		<Button type="filled" on:click={() => signOut()}>Sign out</Button>
	</svelte:fragment>
</Dialog>

<nav
	class="m3-container sticky top-4 mx-auto flex max-w-[900px] flex-row items-center justify-between gap-2 rounded-xl p-2"
>
	<a href="/" class="text-xl">JustTrack</a>
	<div class="flex flex-row items-center gap-2">
		{#if session}
			<button
				onclick={() => (userDialogOpened = true)}
				class="cursor-pointer active:cursor-pointer"
			>
				<UserAvatar />
			</button>
		{:else}
			<Button type="filled" on:click={() => signIn('github')}>Sign in</Button>
		{/if}
	</div>
</nav>
