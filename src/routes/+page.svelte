<script lang="ts">
	import MovieTile from '$lib/components/homepage/MovieTile.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const recentMovies = data.recentMovies;
</script>

<div class="flex flex-col gap-8">
	<h3 class="text-2xl font-bold">Recently viewed movies</h3>
	<div class="grid grid-cols-6 gap-4">
		{#each recentMovies as movie (movie.movieId)}
			<MovieTile {movie} />
		{/each}
	</div>
</div>
