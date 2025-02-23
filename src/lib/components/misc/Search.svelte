<script lang="ts">
	import type { imdbMediaT, imdbMovieT, imdbTvT } from '$lib/server/db/schema';

	import MaterialSymbolsSearchRounded from '~icons/material-symbols/search-rounded';

	let dialog: HTMLDivElement;
	let query = $state('');
	let lastQuery = $state('');
	let results: {
		imdb_media_t: typeof imdbMediaT.$inferSelect;
		imdb_movie_t: typeof imdbMovieT.$inferSelect;
		imdb_tv_t: typeof imdbTvT.$inferSelect;
	}[] = $state([]);

	$effect(() => {
		if (query !== '') {
			dialog.classList.remove('hidden');
			dialog.classList.add('block');

			if (query === lastQuery) return;
			console.log('query: %s', query);
			fetch(`/api/media/search?query=${query}`)
				.then((res) => res.json())
				.then((data) => {
					console.log('response data: %o', data);
					results = data;
				});
			lastQuery = query;
			console.log('results: %o', $state.snapshot(results));
		} else {
			dialog.classList.add('hidden');
			dialog.classList.remove('block');
		}
	});
</script>

<div
	class="absolute top-20 right-4 left-4 z-40 mx-auto hidden rounded-xl p-4 md:right-0 md:left-auto md:w-96"
	style:background-color="rgb(var(--m3-scheme-surface-container))"
	bind:this={dialog}
>
	{#each results as { imdb_media_t, imdb_movie_t, imdb_tv_t }}
		<div>
			<a
				data-sveltekit-reload
				href={imdb_media_t.movieId ? `/movie/${imdb_movie_t.movieId}` : `/tv/${imdb_tv_t.tvId}`}
				class="w-full"
			>
				{imdb_media_t.movieId ? imdb_movie_t.title : imdb_tv_t.name}
			</a>
		</div>
	{:else}
		<p class="text-center">No results found</p>
	{/each}
</div>

<div
	class="z-50 grid grid-cols-[1fr_90%] items-center gap-2 rounded-sm px-2 py-3"
	style:border=".0625rem solid rgb(var(--error, var(--m3-scheme-outline)))"
	style:color="rgb(var(--m3-scheme-on-surface))"
>
	<MaterialSymbolsSearchRounded />
	<input type="text" placeholder="Search" class="border-none outline-none" bind:value={query} />
</div>
