<script lang="ts">
	import { UnorderedList, ListItem } from '$lib/components/m3';
	import UserAvatar from '$lib/components/misc/UserAvatar.svelte';

	import { page } from '$app/state';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { Button, Dialog } from 'm3-svelte';

	const session = page.data.session;

	let userDialogOpened = $state(false);
</script>

<Dialog bind:open={userDialogOpened} headline="JustTrack">
	<p>
		Logged in as <span class="font-bold">{session?.user?.name}</span>
	</p>

	<UnorderedList>
		<ListItem><a href="/watchlists">Your watchlists</a></ListItem>
		<ListItem><a href="/watchlists/public">Public watchlists</a></ListItem>
	</UnorderedList>

	<svelte:fragment slot="buttons">
		<Button type="filled" on:click={() => signOut()}>Sign out</Button>
	</svelte:fragment>
</Dialog>

<nav
	class="sticky top-4 z-50 mx-auto mb-4 max-w-[900px] rounded-xl"
	style:background-color="rgb(var(--m3-scheme-surface-container))"
>
	<div class="flex flex-row items-center justify-between gap-2 px-4 py-2">
		<a href="/" class="text-xl">JustTrack</a>

		<div class="hidden flex-row items-center gap-8 sm:flex">
			<a href="/watchlists">Your watchlists</a>
			<a href="/watchlists/public">Public watchlists</a>
		</div>

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
	</div>
</nav>
