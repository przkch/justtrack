<script lang="ts">
	import WatchlistItem from '$lib/components/wachlist/Item.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let watchlist = data.watchlist;
</script>

<svelte:head>
	<title>Watchlists | JustTrack</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<div class="flex flex-col justify-between gap-4 lg:flex-row">
		<div class="flex flex-col">
			<h3 class="text-xl font-bold">{watchlist.name}</h3>
			<span
				>By <a href={`/user/${watchlist.user.id}`} class="underline">{watchlist.user.name}</a></span
			>
			<span>
				{[
					`${watchlist.watchlistItemT.length} items`,
					watchlist.type === 'movie'
						? 'Movies'
						: watchlist.type === 'tv'
							? 'TV series'
							: 'Movies & TV series'
				]
					.filter((v) => v)
					.join(', ')}
			</span>
		</div>

		<div class="flex w-fit flex-col justify-center">
			<div class="grid grid-cols-[1fr_3fr] flex-col gap-x-1">
				<span class="lg:text-right">Created</span>
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
					<span class="lg:text-right">Updated</span>
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
	</div>

	<div class="flex flex-col gap-4">
		{#each watchlist.watchlistItemT as item (item.itemId)}
			<WatchlistItem {item} />
		{:else}
			<p class="text-center">No media in this watchlist :(</p>
		{/each}
	</div>
</div>
