<script lang="ts">
	import Tile from '$lib/components/homepage/Tile.svelte';
	import Backdrop from '$lib/components/media/Backdrop.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { recentMovies, recentTv } = data;
</script>

<Backdrop backdropPath={recentMovies[0].backdropPath} />

<div class="flex flex-col gap-8">
	<div class="flex flex-col gap-4">
		<h3 class="text-2xl font-bold">Recently viewed movies</h3>
		{#if recentMovies.length}
			<div class="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
				{#each recentMovies as movie (movie.movieId)}
					<Tile {movie} />
				{/each}
			</div>
		{:else}
			<p>No movies have been viewed yet :(</p>
		{/if}
	</div>

	<div class="flex flex-col gap-4">
		<h3 class="text-2xl font-bold">Recently viewed TV series</h3>
		{#if recentTv.length}
			<div class="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
				{#each recentTv as tv (tv.tvId)}
					<Tile {tv} />
				{/each}
			</div>
		{:else}
			<p>No TV series have been viewed yet :(</p>
		{/if}
	</div>
</div>
