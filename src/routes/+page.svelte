<script lang="ts">
	import MovieTile from '$lib/components/homepage/MovieTile.svelte';
	import TvTile from '$lib/components/homepage/TvTile.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { recentMovies, recentTv } = data;
</script>

<div class="flex flex-col gap-8">
	<h3 class="text-2xl font-bold">Recently viewed movies</h3>
	<div class="grid grid-cols-6 gap-4">
		{#each recentMovies as movie (movie.movieId)}
			<MovieTile {movie} />
		{/each}
	</div>
	<h3 class="text-2xl font-bold">Recently viewed TV series</h3>
	<div class="grid grid-cols-6 gap-4">
		{#each recentTv as tv (tv.tvId)}
			<TvTile {tv} />
		{/each}
	</div>
</div>
