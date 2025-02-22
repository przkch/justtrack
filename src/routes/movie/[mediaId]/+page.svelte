<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const movie = data.movie;
</script>

<div class="flex flex-col gap-8">
	<div class="flex flex-row gap-4">
		<img src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`} alt={movie.title} />

		<div class="flex flex-col gap-4">
			<div class="flex flex-col">
				<h3 class="text-xl font-bold">{movie.title}</h3>
				{#if movie.title !== movie.originalTitle}
					<span>{movie.originalTitle}</span>
				{/if}
				<span>{movie.releaseDate}</span>
			</div>
			<p>{movie.overview}</p>
			<div class="flex flex-col">
				<span>User score: {movie.voteAverage?.toFixed(2)}% with {movie.voteCount} votes</span>
				<span>Adult: {movie.adult}</span>
				<span>Original language: {movie.originalLanguage}</span>
			</div>
		</div>
	</div>
</div>
