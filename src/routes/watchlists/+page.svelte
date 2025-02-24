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

	const watchlists = $state(data.watchlists);

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
	<title>Your watchlists | JustTrack</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<div class="flex flex-col gap-4">
		<h3 class="ml-1 text-2xl font-bold">New watchlist</h3>
		<form
			onsubmit={addWatchlist}
			class="grid grid-cols-1 items-center gap-4 md:grid-cols-[4.8fr_2fr_1fr]"
		>
			<TextField name="name" bind:value={addWatchlistData.name} required />
			<div class="flex w-auto flex-row items-center justify-center gap-4">
				<SegmentedButtonContainer>
					<input type="checkbox" id="mediaTypeMovie" name="mediaType" value="movie" />
					<SegmentedButtonItem input="mediaTypeMovie">Movies</SegmentedButtonItem>

					<input type="checkbox" id="mediaTypeTv" name="mediaType" value="tv" />
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

	<div class="flex flex-col gap-4">
		<h3 class="ml-1 text-2xl font-bold">Your watchlists</h3>
		{#each watchlists as watchlist (watchlist.watchlistId)}
			<Card type="filled">
				<div class="flex flex-row items-center justify-between gap-4 text-sm">
					<div class="flex flex-col">
						<a href={`/watchlists/${watchlist.watchlistId}`} class="text-xl font-bold">
							{watchlist.name}
						</a>

						<span>
							{[
								`${watchlist.watchlistItemT.length} items`,
								watchlist.type === 'movie'
									? 'Movies'
									: watchlist.type === 'tv'
										? 'TV series'
										: 'Movies & TV series',
								watchlist.isPublic ? `public` : ''
							]
								.filter((v) => v)
								.join(', ')}
						</span>
					</div>
					<div class="grid grid-cols-[1fr_3fr] gap-x-1">
						<span class="text-right">Created</span>
						<span class="font-bold">
							{new Date(watchlist.createdAt).toLocaleDateString('en', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
								hour: 'numeric',
								minute: 'numeric'
							})}
						</span>
						{#if watchlist.createdAt !== watchlist.updatedAt}
							<span class="text-right">Updated</span>
							<span class="font-bold">
								{new Date(watchlist.updatedAt).toLocaleDateString('en', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
									hour: 'numeric',
									minute: 'numeric'
								})}
							</span>
						{/if}
					</div>
				</div>
			</Card>
		{:else}
			<p class="text-center">You have no watchlists yet :(</p>
		{/each}
	</div>
</div>
