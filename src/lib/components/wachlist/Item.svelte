<script lang="ts">
	import Poster from '$lib/components/media/Poster.svelte';
	import type { watchlistItemT, imdbMediaT, imdbMovieT, imdbTvT } from '$lib/server/db/schema';

	import { Card } from 'm3-svelte';

	interface Props {
		item: typeof watchlistItemT.$inferSelect & {
			imdbMediaT: typeof imdbMediaT.$inferSelect & {
				imdbMovieT: typeof imdbMovieT.$inferSelect;
				imdbTvT: typeof imdbTvT.$inferSelect;
			};
		};
	}

	const { item }: Props = $props();
</script>

<Card type="filled">
	<div class="flex flex-row gap-4 text-sm">
		<Poster
			alt={item.imdbMediaT.imdbMovieT
				? item.imdbMediaT.imdbMovieT.title
				: item.imdbMediaT.imdbTvT?.name}
			posterPath={item.imdbMediaT.imdbMovieT
				? item.imdbMediaT.imdbMovieT.posterPath
				: item.imdbMediaT.imdbTvT?.posterPath}
			size="sm"
		/>
		<div class="flex flex-col">
			<a
				href={item.imdbMediaT.imdbMovieT
					? `/movie/${item.imdbMediaT.imdbMovieT.movieId}`
					: `/tv/${item.imdbMediaT.imdbTvT.tvId}`}
				class="text-xl"
			>
				{item.imdbMediaT.imdbMovieT
					? item.imdbMediaT.imdbMovieT.title
					: item.imdbMediaT.imdbTvT.name}
			</a>
		</div>
	</div>
</Card>
