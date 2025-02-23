<script lang="ts">
	import Poster from '$lib/components/media/Poster.svelte';

	import { Card, Snackbar, Switch, TextField } from 'm3-svelte';
	import type { SnackbarIn } from 'm3-svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let watchlist = data.watchlist;

	let snackbar = $state((data: SnackbarIn) => {});
	let editWatchlistData = $state({
		name: watchlist.name,
		isPublic: watchlist.isPublic
	});

	$effect(() => {
		saveWatchlist();
	});

	const saveWatchlist = async () => {
		const formData = new FormData();

		formData.set('name', editWatchlistData.name);
		formData.set('isPublic', String(editWatchlistData.isPublic));

		const res = await fetch(`/api/watchlists/${watchlist.watchlistId}`, {
			method: 'POST',
			body: formData
		});

		if (res.status === 200) {
			snackbar({ message: 'Watchlist updated', closable: true });
		}
	};
</script>

<svelte:head>
	<title>Watchlists | JustTrack</title>
</svelte:head>

<Snackbar bind:show={snackbar} />

<div class="flex flex-col gap-8">
	<div class="grid grid-cols-[10fr_1fr] items-center gap-4">
		<TextField name="name" bind:value={editWatchlistData.name} required />
		<div class="flex w-auto flex-row items-center justify-center gap-4">
			<label class="flex flex-row items-center gap-2">
				<Switch bind:checked={editWatchlistData.isPublic} />
				<span class="select-none">Public</span>
			</label>
		</div>
	</div>

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
		{/each}
	</div>
</div>
