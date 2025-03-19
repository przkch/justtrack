<script lang="ts">
	import type { SearchMultiResponse } from '$lib/server/tmdb';

	import MaterialSymbolsSearchRounded from '~icons/material-symbols/search-rounded';
	import Poster from '$lib/components/media/Poster.svelte';

	let dialog: HTMLDivElement;
	let query = $state('');
	let lastQuery = $state('');
	let results: SearchMultiResponse | undefined = $state();

	$effect(() => {
		if (query !== '') {
			dialog.classList.remove('hidden');
			dialog.classList.add('block');

			if (query === lastQuery) return;

			fetch(`/api/media/search?query=${query}`)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					results = data.response;
				});

			lastQuery = query;
		} else {
			dialog.classList.add('hidden');
			dialog.classList.remove('block');
		}
	});
</script>

<div
	class="absolute top-20 right-4 left-4 z-40 mx-auto hidden max-h-[calc(100vh-15rem)] overflow-y-auto rounded-xl p-4 md:right-0 md:left-auto"
	style:background-color="rgb(var(--m3-scheme-surface-container))"
	bind:this={dialog}
>
	{#if results && results.results.length}
		<div class="flex flex-col gap-2">
			{#each results.results as result}
				{#if (result.first_air_date ?? result.release_date) && result.overview}
					<a
						data-sveltekit-reload
						href={result.media_type === 'movie' ? `/movie/${result.id}` : `/tv/${result.id}`}
						class="flex flex-row gap-4 rounded-xl p-2"
						style:background-color="rgb(var(--m3-scheme-surface))"
					>
						<Poster alt={result.title ?? result.name} posterPath={result.poster_path} size="sm" />
						<div class="flex w-full flex-col gap-2">
							<div class="flex flex-row justify-between gap-1">
								<div class="flex flex-col">
									<h4 class="text-xl">{result.title ?? result.name}</h4>
									<span>{(result.first_air_date ?? result.release_date)?.split('-')[0]} </span>
								</div>
								<span>{result.media_type === 'movie' ? 'Movie' : 'TV Series'}</span>
							</div>
							<span class="line-clamp-5 text-xs">
								{result.overview}
							</span>
						</div>
					</a>
				{/if}
			{/each}
		</div>
	{:else}
		<p class="text-center">No results found</p>
	{/if}
</div>

<div
	class="z-50 grid grid-cols-[1fr_90%] items-center gap-4 rounded-full px-5 py-3"
	style:background="rgb(var(--m3-scheme-background))"
>
	<MaterialSymbolsSearchRounded />
	<input
		type="text"
		placeholder="Search"
		class="w-32 border-none outline-none"
		autocomplete="off"
		bind:value={query}
	/>
</div>
