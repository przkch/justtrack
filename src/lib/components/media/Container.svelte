<script lang="ts">
	import Backdrop from '$lib/components/media/Backdrop.svelte';
	import Poster from '$lib/components/media/Poster.svelte';
	import type { imdbMediaT, imdbMovieT, imdbTvT } from '$lib/server/db/schema';

	import { Button, Chip } from 'm3-svelte';
	import AddToWatchlistDialog from './AddToWatchlistDialog.svelte';

	interface Props {
		movie?: typeof imdbMovieT.$inferSelect & { imdbMediaT: typeof imdbMediaT.$inferSelect };
		tv?: typeof imdbTvT.$inferSelect & { imdbMediaT: typeof imdbMediaT.$inferSelect };
	}

	const { movie, tv }: Props = $props();
	const media = movie ?? tv;

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

	if (movie && movie.runtime) {
		let minutes = movie.runtime;
		if (minutes > 60) {
			let hours = Math.floor(minutes / 60);
			chips.push(`${hours}h ${minutes - hours * 60}m`);
		} else {
			chips.push(`${minutes}m`);
		}
	}

	let addToWatchlistDialogOpen = $state(false);
</script>

{#if media?.backdropPath}
	<Backdrop backdropPath={media.backdropPath} />
{/if}

<AddToWatchlistDialog
	bind:open={addToWatchlistDialogOpen}
	name={movie ? movie.title : tv?.name}
	media={media?.imdbMediaT}
/>

<div class="flex flex-col gap-8">
	<div class="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_3fr]">
		<div class="flex justify-center">
			<Poster alt={movie ? movie.title : tv?.name} posterPath={media?.posterPath} />
		</div>
		<div class="grid grid-cols-1 gap-4">
			<h3 class="text-3xl font-bold">{movie ? movie.title : tv?.name}</h3>

			<p class="italic">{media?.tagline}</p>

			<div class="flex flex-row flex-wrap gap-2">
				{#each chips as chip}
					<Chip type="general">{chip}</Chip>
				{/each}
			</div>

			<span title={`${media?.voteCount} votes`}>
				{Math.round(Number(media?.voteAverage) * 10)}% liked
			</span>

			<p>{media?.overview}</p>

			<div>
				<Button type="filled" on:click={() => (addToWatchlistDialogOpen = true)}
					>Add to watchlist</Button
				>
			</div>
		</div>
	</div>

	<div>
		<a
			href={`https://www.themoviedb.org/${movie ? `movie/${movie.movieId}` : `tv/${tv?.tvId}`}`}
			class="underline"
		>
			Check {movie ? movie.title : tv?.name} on TMDB
		</a>
	</div>
</div>
