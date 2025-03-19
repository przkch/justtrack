<script lang="ts">
	import Container from '$lib/components/media/Container.svelte';
	import Poster from '$lib/components/media/Poster.svelte';

	import type { PageProps } from './$types';
	import { Chip } from 'm3-svelte';

	let { data }: PageProps = $props();
	const tv = data.tv;
</script>

<svelte:head>
	<title>{tv.name} | JustTrack</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<Container {tv} />

	<div class="flex flex-col gap-8">
		{#if !tv.seasons}
			<p>this show has no seasons...</p>
		{:else}
			<h3 class="text-2xl font-bold">
				{#if tv.seasons.length === 1}
					1 season
				{:else}
					{tv.seasons!.length} seasons
				{/if}
			</h3>

			<div class="flex flex-col gap-4 not-last:border-b">
				{#each tv.seasons as season, index}
					<div class="flex flex-row items-center gap-4 rounded-xl">
						<Poster posterPath={season.poster_path} size="sm" />

						<div class="flex flex-col justify-center gap-4">
							<span class="text-xl">
								<a href={`/tv/${tv.tvId}/season/${index + 1}`}>
									{season.name}
								</a>
							</span>

							<div class="flex flex-row flex-wrap gap-2">
								<Chip type="general">
									{#if season.air_date}
										{new Date(season.air_date).toLocaleDateString('en', {
											year: 'numeric',
											month: 'long',
											day: 'numeric'
										})}
									{:else}
										Unreleased
									{/if}
								</Chip>
								<Chip type="general">
									{Math.round(Number(season.vote_average) * 10)}% liked
								</Chip>
								<Chip type="general">{season.episode_count} episodes</Chip>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
