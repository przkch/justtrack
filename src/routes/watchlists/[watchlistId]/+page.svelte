<script lang="ts">
	import {
		Button,
		Card,
		SegmentedButtonContainer,
		SegmentedButtonItem,
		Switch,
		TextField
	} from 'm3-svelte';
	import type { PageProps } from './$types';
	import { watchlistItemT } from '$lib/server/db/schema';

	let { data }: PageProps = $props();

	let addWatchlistData = $state({
		name: ''
	});

	const watchlists = data.watchlist;

	const editWatchlist = async (event: SubmitEvent) => {
		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);

		formData.set('name', addWatchlistData.name);

		console.log(formData);

		const res = await fetch('/api/watchlists', { method: 'POST', body: formData });
		const resData = await res.json();
		if (res.status === 200) {
			watchlists.push({ ...resData, watchlistItemT: [] });
		}
	};
</script>

<svelte:head>
	<title>Watchlists | JustTrack</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<div class="flex flex-col gap-2">
		<form
			onsubmit={editWatchlist}
			class="grid grid-cols-1 items-center gap-4 lg:grid-cols-[4.8fr_2fr_1fr_1fr]"
		>
			<TextField name="name" bind:value={addWatchlistData.name} required />
			<div class="flex w-auto flex-row items-center justify-center gap-4">
				<SegmentedButtonContainer>
					<input type="radio" id="mediaTypeMovie" name="mediaType" value="movie" required />
					<SegmentedButtonItem input="mediaTypeMovie">Movies</SegmentedButtonItem>

					<input type="radio" id="mediaTypeTv" name="mediaType" value="tv" required />
					<SegmentedButtonItem input="mediaTypeTv">TV series</SegmentedButtonItem>
				</SegmentedButtonContainer>
				<label class="flex flex-row items-center gap-2">
					<Switch />
					Public
				</label>
			</div>

			<div class="flex flex-col items-center lg:block">
				<Button type="filled">Dodaj</Button>
			</div>
		</form>
	</div>

	{#if watchlists.length}
		<div class="flex flex-col gap-2">
			<h3>Your watchlists</h3>
			{#each watchlists as watchlist (watchlist.watchlistId)}
				<Card type="elevated">
					<h4 class="text-xl">
						<a href={`/watchlists/${watchlist.watchlistId}`}>{watchlist.name}</a>
					</h4>
				</Card>
			{/each}
		</div>
	{/if}
</div>
