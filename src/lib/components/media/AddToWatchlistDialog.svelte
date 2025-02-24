<script lang="ts">
	import type { watchlistT, watchlistItemT } from '$lib/server/db/schema';

	import { Button, ButtonLink, Dialog } from 'm3-svelte';
	import { onMount } from 'svelte';

	let { open = $bindable(), name, media } = $props();

	let watchlists:
		| (typeof watchlistT.$inferSelect & {
				watchlistItemT: (typeof watchlistItemT.$inferSelect)[];
		  })[]
		| undefined = $state();
	let selectedWatchlist: number | undefined = $state();

	onMount(async () => {
		watchlists = await fetch(`/api/watchlists?mediaType=${media.movieId ? 'movie' : 'tv'}`).then(
			(res) => res.json()
		);
	});

	const onsubmit = async () => {
		const url = `/api/watchlists/${selectedWatchlist}/item/${media.itemId}`;

		const res = await fetch(url, {
			method: 'PUT'
		});

		if (res.status === 200) {
			const data = await res.json();
			console.log(data);
			console.log(
				'filtered watchlist: %o',
				watchlists?.filter((watchlist) => watchlist.watchlistId !== data.watchlistId)
			);
			watchlists = watchlists?.filter((watchlist) => watchlist.watchlistId !== data.watchlistId);
		}
	};
</script>

<Dialog bind:open headline={`Add ${name} to watchlist`}>
	{#if !watchlists}
		<p class="text-center">Loading your watchlists...</p>
	{:else if !watchlists.length}
		<p class="text-center">
			Every watchlist you have already has this {media.movieId ? 'movie' : 'tv'} in it ._.
		</p>
	{:else}
		<select bind:value={selectedWatchlist}>
			{#each watchlists as watchlist (watchlist.watchlistId)}
				<option value={watchlist.watchlistId}>{watchlist.name}</option>
			{/each}
		</select>
	{/if}

	<svelte:fragment slot="buttons">
		{#if watchlists?.length}
			<Button type="elevated" on:click={onsubmit}>Add</Button>
		{:else}
			<ButtonLink type="filled" href="/watchlists">View your watchlists</ButtonLink>
		{/if}
	</svelte:fragment>
</Dialog>
