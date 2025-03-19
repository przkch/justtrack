<script lang="ts">
	import { UnorderedList, ListItem } from '$lib/components/m3';
	import UserAvatar from '$lib/components/misc/UserAvatar.svelte';
	import Search from '$lib/components/misc/Search.svelte';

	import Favicon from '~icons/justtrack/favicon';

	import { page } from '$app/state';
	import { ButtonLink, Dialog } from 'm3-svelte';

	const session = page.data.session;

	let userDialogOpened = $state(false);
</script>

<Dialog bind:open={userDialogOpened} headline="JustTrack">
	<p>
		Logged in as <span class="font-bold">{session?.user?.name}</span>
	</p>

	<UnorderedList>
		<ListItem><a data-sveltekit-reload href="/watchlists">Your watchlists</a></ListItem>
		<ListItem><a data-sveltekit-reload href="/watchlists/public">Public watchlists</a></ListItem>
	</UnorderedList>

	<svelte:fragment slot="buttons">
		<ButtonLink type="filled" href="/auth/signout">Sign out</ButtonLink>
	</svelte:fragment>
</Dialog>

<nav class="sticky top-4 z-50 mx-auto mb-4 max-w-[900px] px-4">
	<div
		class="grid grid-cols-[1fr_1fr_1fr] items-center justify-between gap-2 rounded-xl px-4 py-2 backdrop-blur-xs md:grid-cols-[2fr_1fr]"
		style:background-color={`color-mix(in oklab, rgb(var(--m3-scheme-surface-container)), transparent
	20%)`}
	>
		<div class="flex flex-row items-center gap-8">
			<ButtonLink type="text" href="/">
				<div class="flex flex-row items-center gap-4">
					<Favicon style="font-size: 1.25rem" />
					<span class="hidden text-xl font-bold lg:inline-block">JustTrack</span>
				</div>
			</ButtonLink>

			<div class="mdflex hidden flex-row items-center gap-4 md:flex">
				<a data-sveltekit-reload href="/watchlists">Your watchlists</a>
				<a data-sveltekit-reload href="/watchlists/public">Public watchlists</a>
			</div>
		</div>

		<div class="block md:hidden">
			<Search />
		</div>

		<div class="flex flex-row items-center justify-end gap-4">
			<div class="hidden md:block">
				<Search />
			</div>
			{#if session}
				<button
					onclick={() => (userDialogOpened = true)}
					class="cursor-pointer active:cursor-pointer"
				>
					<UserAvatar />
				</button>
			{:else}
				<div class="min-w-fit">
					<ButtonLink type="filled" href="/auth/signin">Sign in</ButtonLink>
				</div>
			{/if}
		</div>
	</div>
</nav>
