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

<div class="flex flex-col gap-4">
	<a href={movie ? `/movie/${movie.movieId}` : `/tv/${tv?.tvId}`}>
		<Poster alt={movie ? movie.title : tv?.name} posterPath={media?.posterPath} />
	</a>

	<div class="flex flex-col">
		<a href={movie ? `/movie/${movie.movieId}` : `/tv/${tv?.tvId}`}>
			{movie ? movie.title : tv?.name}
		</a>
	</div>
</div>
