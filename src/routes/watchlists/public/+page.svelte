<script lang="ts">
	import { Card } from 'm3-svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Public watchlists | JustTrack</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<div class="flex flex-col gap-4">
		<h3 class="ml-1 text-2xl font-bold">Public watchlists</h3>
		{#each data.watchlists as watchlist (watchlist.watchlistId)}
			<Card type="filled">
				<div class="flex flex-row items-center justify-between gap-4 text-sm">
					<div class="flex flex-col">
						<a href={`/watchlists/public/${watchlist.watchlistId}`} class="text-xl font-bold">
							{watchlist.name}</a
						>
						<span>By <span class="font-bold">{watchlist.user.name}</span></span>
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
			<p class="text-center">No public watchlists yet :(</p>
		{/each}
	</div>
</div>
