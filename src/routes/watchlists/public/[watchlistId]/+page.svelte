<script lang="ts">
	import Poster from '$lib/components/media/Poster.svelte';

	import { Card } from 'm3-svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let watchlist = data.watchlist;
</script>

<svelte:head>
	<title>Watchlists | JustTrack</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<div class="flex flex-col gap-4">
		{#each watchlist.watchlistItemT as item (item.itemId)}
			<Card type="filled">
				<div class="flex flex-row gap-4 text-sm">
					<Poster
						alt={item.imdbMediaT.imdbMovieT
							? item.imdbMediaT.imdbMovieT.title
							: item.imdbMediaT.imdbTvT?.name}
						posterPath={item.imdbMediaT.imdbMovieT
							? item.imdbMediaT.imdbMovieT.posterPath
							: item.imdbMediaT.imdbTvT?.posterPath}
						size="sm"
					/>
					<div class="flex flex-col">
						<a
							href={item.imdbMediaT.imdbMovieT
								? `/movie/${item.imdbMediaT.imdbMovieT.movieId}`
								: `/tv/${item.imdbMediaT.imdbTvT.tvId}`}
							class="text-xl"
						>
							{item.imdbMediaT.imdbMovieT
								? item.imdbMediaT.imdbMovieT.title
								: item.imdbMediaT.imdbTvT.name}
						</a>
					</div>
				</div>
			</Card>
		{:else}
			<p class="text-center">No media in this watchlist :(</p>
		{/each}
	</div>
</div>
