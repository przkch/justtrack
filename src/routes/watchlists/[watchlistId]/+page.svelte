<script lang="ts">
	import WatchlistItem from '$lib/components/wachlist/Item.svelte';

	import { Button, Snackbar, Switch, TextField } from 'm3-svelte';
	import type { SnackbarIn } from 'm3-svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let watchlist = $state(data.watchlist);
	let snackbar = $state((data: SnackbarIn) => {});

	const saveWatchlist = async () => {
		const formData = new FormData();

		formData.set('name', watchlist.name);
		formData.set('isPublic', String(watchlist.isPublic));

		const res = await fetch(`/api/watchlists/${watchlist.watchlistId}`, {
			method: 'POST',
			body: formData
		});

		if (res.status === 200) {
			const data = await res.json();
			watchlist = data;
			snackbar({ message: 'Watchlist updated', closable: true });
		}
	};

	const shareWatchlist = async () => {
		try {
			await navigator.clipboard.writeText(
				`https://justtrack.przekichane.pl/watchlists/public/${watchlist.watchlistId}`
			);

			snackbar({
				message: 'Link to this watchlist successfully copied to the clipboard!',
				closable: true
			});
		} catch (e) {
			console.error(e);
			snackbar({ message: 'Something went wrong while copying the link!', closable: true });
		}
	};

	const deleteFromWatchlist = async (itemId: number) => {
		const res = await fetch(`/api/watchlists/${watchlist.watchlistId}/item/${itemId}`, {
			method: 'DELETE'
		});
		if (res.status === 200) {
			watchlist.watchlistItemT = watchlist.watchlistItemT.filter((item) => item.itemId !== itemId);
			snackbar({ message: 'Item removed from the watchlist!', closable: true });
		}
	};
</script>

<svelte:head>
	<title>Watchlists | JustTrack</title>
</svelte:head>

<Snackbar bind:show={snackbar} />

<div class="flex flex-col gap-8">
	<div class="grid grid-cols-[10fr_1fr_1fr] items-center gap-4">
		<TextField name="name" bind:value={watchlist.name} required />
		<div class="flex w-auto flex-row items-center justify-center gap-4">
			<label class="flex flex-row items-center gap-2">
				<Switch bind:checked={watchlist.isPublic} />
				<span class="select-none">Public</span>
			</label>
		</div>

		<Button type="filled" on:click={saveWatchlist}>Save</Button>
	</div>

	{#if watchlist.isPublic}
		<div class="flex flex-row justify-start">
			<Button type="filled" on:click={shareWatchlist}>Share link to this watchlist</Button>
		</div>
	{/if}

	<div class="flex flex-col gap-4">
		{#each watchlist.watchlistItemT as item (item.itemId)}
			<WatchlistItem {item} />
		{:else}
			<p class="text-center">
				No {watchlist.type === 'movie' ? 'movies' : 'TV series'} have been added to this list yet :(
			</p>
		{/each}
	</div>
</div>
