<script lang="ts">
	import Poster from '$lib/components/media/Poster.svelte';
	import type { imdbMovieT, imdbTvT } from '$lib/server/db/schema';

	interface Props {
		movie?: typeof imdbMovieT.$inferSelect;
		tv?: typeof imdbTvT.$inferSelect;
	}

	const { movie, tv }: Props = $props();
	const media = movie ?? tv;
</script>

<div class="flex flex-col gap-8">
	<div class="flex flex-row gap-4">
		<Poster alt={movie ? movie.title : tv?.name} posterPath={media?.posterPath} />
		<div class="flex flex-col gap-8">
			<div class="flex flex-col">
				{#if movie}
					<h3 class="text-xl font-bold">{movie.title}</h3>
					{#if movie.title !== movie.originalTitle}
						<span>{movie.originalTitle}</span>
					{/if}
				{:else if tv}
					<h3 class="text-xl font-bold">
						{tv.name}
					</h3>
					{#if tv.name !== tv.originalName}
						<span class="text-sm">Original title: {tv.originalName}</span>
					{/if}
				{/if}
				<span
					>{new Date(movie ? movie.releaseDate! : tv!.firstAirDate!).toLocaleDateString('en', {
						year: 'numeric',
						month: 'long'
					})}</span
				>
			</div>

			<div class="flex flex-col">
				<span>User score: {media?.voteAverage?.toFixed(2)}% with {media?.voteCount} votes</span>
				<span>Adult: {media?.adult}</span>
				<span>Original language: {media?.originalLanguage}</span>
			</div>
		</div>
	</div>

	<div>
		<div class="flex flex-col gap-4">
			<p>
				{media?.overview}
			</p>
		</div>
	</div>
	<a
		href={`https://www.themoviedb.org/${movie ? `movie/${movie.movieId}` : `tv/${tv?.tvId}`}`}
		class="underline"
	>
		Check {movie ? movie.title : tv?.name} on TMDB
	</a>
</div>
