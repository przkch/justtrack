<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const tv = data.tv;
</script>

<div class="flex flex-col gap-8">
	<div class="flex flex-row gap-4">
		<img src={`https://image.tmdb.org/t/p/w500/${tv.posterPath}`} alt={tv.name} />

		<div class="flex flex-col gap-4">
			<div class="flex flex-col">
				<h3 class="text-xl font-bold">{tv.name}</h3>
				{#if tv.name !== tv.originalName}
					<span>{tv.originalName}</span>
				{/if}
				<span>{tv.firstAirDate}</span>
			</div>
			<p>{tv.overview}</p>
			<div class="flex flex-col">
				<span>User score: {tv.voteAverage?.toFixed(2)}% with {tv.voteCount} votes</span>
				<span>Adult: {tv.adult}</span>
				<span>Original language: {tv.originalLanguage}</span>
			</div>
		</div>
	</div>
</div>
