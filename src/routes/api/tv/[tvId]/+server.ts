import { db } from '$lib/server/db';
import { imdbTvT, imdbMediaT } from '$lib/server/db/schema';
import { TMDB } from '$lib/server/tmdb';

import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const tvId = Number(params.tvId);

	const dbResult = await db.query.imdbTvT.findFirst({
		where: (tv, { eq }) => eq(tv.tvId, tvId),
		with: {
			imdbMediaT: true
		}
	});

	if (dbResult) return json(dbResult);

	const tmdbResponse = await TMDB.getTv(tvId);

	if (!tmdbResponse || tmdbResponse.response.success === false) {
		error(404, tmdbResponse.response.status_message);
	}

	const tv = tmdbResponse.tv;

	await db.insert(imdbTvT).values({
		adult: tv.adult,
		backdropPath: tv.backdrop_path,
		createdBy: tv.created_by,
		episodeRunTime: tv.episode_run_time,
		firstAirDate: tv.first_air_date,
		genres: tv.genres,
		homepage: tv.homepage,
		tvId: tv.id,
		inProduction: tv.in_production,
		languages: tv.languages,
		lastAirDate: tv.last_air_date,
		lastEpisodeToAir: tv.last_episode_to_air,
		name: tv.name,
		nextEpisodeToAir: tv.next_episode_to_air,
		networks: tv.networks,
		numberOfEpisodes: tv.number_of_episodes,
		numberOfSeasons: tv.number_of_seasons,
		originCountry: tv.origin_country,
		originalLanguage: tv.original_language,
		originalName: tv.original_name,
		overview: tv.overview,
		popularity: tv.popularity,
		posterPath: tv.poster_path,
		productionCompanies: tv.production_companies,
		productionCountries: tv.production_countries,
		seasons: tv.seasons,
		spokenLanguages: tv.spoken_languages,
		status: tv.status,
		tagline: tv.tagline,
		type: tv.type,
		voteAverage: tv.vote_average,
		voteCount: tv.vote_count
	});

	await db.insert(imdbMediaT).values({ tvId: tv.id });

	return json(
		await db.query.imdbTvT.findFirst({
			where: (tv, { eq }) => eq(tv.tvId, tvId),
			with: {
				imdbMediaT: true
			}
		})
	);
};
