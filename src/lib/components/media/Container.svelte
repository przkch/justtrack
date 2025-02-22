<script lang="ts">
	import Poster from '$lib/components/media/Poster.svelte';
	import type { imdbMovieT, imdbTvT } from '$lib/server/db/schema';

	import { Button, Chip } from 'm3-svelte';

	interface Props {
		movie?: typeof imdbMovieT.$inferSelect;
		tv?: typeof imdbTvT.$inferSelect;
	}

	const { movie, tv }: Props = $props();
	const media = movie ?? tv;

	console.debug(media);

	const chips = [
		new Date(movie ? movie.releaseDate! : tv!.firstAirDate!).toLocaleDateString('en', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}),
		...(media?.genres?.flatMap((genre) => genre.name) ?? [])
	];

	if (media?.adult) {
		chips.push('18+');
	}
</script>

<div class="flex flex-col gap-8">
	<div class="flex flex-row gap-4">
		<Poster alt={movie ? movie.title : tv?.name} posterPath={media?.posterPath} />
		<div class="flex flex-col gap-4">
			<h3 class="text-3xl font-bold">{movie ? movie.title : tv?.name}</h3>

			<div class="flex flex-row flex-wrap gap-2">
				{#each chips as chip}
					<Chip type="general">{chip}</Chip>
				{/each}
			</div>

			<span title={`${media?.voteCount} votes`}>{Number(media?.voteAverage) * 10}% liked</span>

			<div class="mt-auto">
				<Button type="filled" disabled>Add to watchlist</Button>
			</div>
		</div>
	</div>

	<p class="italic">
		{media?.tagline}
	</p>
	<p>
		{media?.overview}
	</p>

	<div>
		<a
			href={`https://www.themoviedb.org/${movie ? `movie/${movie.movieId}` : `tv/${tv?.tvId}`}`}
			class="underline"
		>
			Check {movie ? movie.title : tv?.name} on TMDB
		</a>
	</div>
</div>
