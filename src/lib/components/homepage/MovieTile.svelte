<script lang="ts">
	import type { imdbMovieT } from '$lib/server/db/schema';

	interface Props {
		movie: typeof imdbMovieT.$inferSelect;
	}

	const { movie }: Props = $props();
</script>

<div class="flex flex-col gap-4">
	<a href={`/movie/${movie.movieId}`}>
		<img
			src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`}
			alt={movie.title}
			class="rounded-xl"
		/>
	</a>

	<div class="flex flex-col">
		<a href={`/movie/${movie.movieId}`}>{movie.title}</a>
	</div>
</div>
