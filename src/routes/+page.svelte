<script lang="ts">
	import Tile from '$lib/components/homepage/Tile.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { recentMovies, recentTv } = data;
</script>

<div class="flex flex-col gap-8">
	<div class="flex flex-col gap-4">
		<h3 class="text-2xl font-bold">Recently viewed movies</h3>
		<div class="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
			{#each recentMovies as movie (movie.movieId)}
				<Tile {movie} />
			{/each}
		</div>
	</div>

	<div class="flex flex-col gap-4">
		<h3 class="text-2xl font-bold">Recently viewed TV series</h3>
		<div class="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
			{#each recentTv as tv (tv.tvId)}
				<Tile {tv} />
			{/each}
		</div>
	</div>
</div>
