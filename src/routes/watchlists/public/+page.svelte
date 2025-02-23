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
	<title>Public watchlists | JustTrack</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<div class="flex flex-col gap-4">
		<h3 class="ml-1 text-2xl font-bold">Public watchlists</h3>
		{#each watchlists as watchlist (watchlist.watchlistId)}
			<Card type="filled">
				<div class="flex flex-row items-center justify-between gap-4 text-sm">
					<div class="flex flex-col">
						<a href={`/watchlists/${watchlist.watchlistId}`} class="text-xl font-bold">
							{watchlist.name}</a
						>
						<span>By <span class="font-bold">{watchlist.user.name}</span></span>
						<span>{watchlist.watchlistItemT.length} items, {watchlist.type}</span>
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
		{/each}
	</div>
</div>
