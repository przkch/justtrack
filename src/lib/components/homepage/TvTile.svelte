<script lang="ts">
	import type { imdbTvT } from '$lib/server/db/schema';

	interface Props {
		tv: typeof imdbTvT.$inferSelect;
	}

	const { tv }: Props = $props();
</script>

<div class="flex flex-col gap-4">
	<a href={`/tv/${tv.tvId}`}>
		<img
			src={`https://image.tmdb.org/t/p/w500/${tv.posterPath}`}
			alt={tv.name}
			class="rounded-xl"
		/>
	</a>

	<div class="flex flex-col">
		<a href={`/tv/${tv.tvId}`}>{tv.name}</a>
	</div>
</div>
