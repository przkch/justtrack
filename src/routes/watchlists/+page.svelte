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

	let { data }: PageProps = $props();

	let addWatchlistData = $state({
		name: ''
	});

	const watchlists = data.watchlists;

	const addWatchlist = async (event: SubmitEvent) => {
		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);

		formData.set('name', addWatchlistData.name);

		console.log(formData);

		const res = await fetch('/api/watchlists', { method: 'PUT', body: formData });
		const resData = await res.json();
		if (res.status === 200) {
			watchlists.push(resData);
		}
	};
</script>

<svelte:head>
	<title>Watchlists | JustTrack</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<div class="flex flex-col gap-2">
		<h3>New watchlist</h3>
		<form
			onsubmit={addWatchlist}
			class="grid grid-cols-1 items-center gap-4 md:grid-cols-[4.8fr_2fr_1fr]"
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
					<span class="select-none">Public</span>
				</label>
			</div>

			<div class="flex flex-col items-center lg:block">
				<Button type="filled">Add</Button>
			</div>
		</form>
	</div>

	<div class="flex flex-col gap-2">
		<h3>Your watchlists</h3>
		{#each watchlists as watchlist (watchlist.watchlistId)}
			<Card type="filled">
				<div class="flex flex-row items-center justify-between gap-4 text-sm">
					<div class="flex flex-col">
						<a href={`/watchlists/${watchlist.watchlistId}`} class="text-xl">{watchlist.name}</a>

						<span>{watchlist.watchlistItemT.length} items, {watchlist.type}</span>
					</div>
					<span>
						Created {new Date(watchlist.createdAt).toLocaleDateString('en', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</span>
				</div>
			</Card>
		{/each}
	</div>
</div>
