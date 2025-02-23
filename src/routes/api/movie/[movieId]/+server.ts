import { db } from '$lib/server/db';
import { imdbMovieT, imdbMediaT } from '$lib/server/db/schema';
import { TMDB } from '$lib/server/tmdb';

import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const movieId = Number(params.movieId);

	const dbResult = await db.query.imdbMovieT.findFirst({
		where: (movie, { eq }) => eq(movie.movieId, movieId),
		with: {
			imdbMediaT: true
		}
	});

	if (dbResult) return json(dbResult);

	const tmdbResponse = await TMDB.getMovie(movieId);

	if (!tmdbResponse || tmdbResponse.response.success === false) {
		error(404, tmdbResponse.response.status_message);
	}

	const movie = tmdbResponse.movie;

	await db.insert(imdbMovieT).values({
		adult: movie.adult,
		backdropPath: movie.backdrop_path,
		belongsToCollection: movie.belongs_to_collection,
		budget: movie.budget,
		genres: movie.genres,
		homepage: movie.homepage,
		imdbId: movie.imdb_id,
		movieId: movie.id,
		originCountry: movie.origin_country,
		originalLanguage: movie.original_language,
		originalTitle: movie.original_title,
		overview: movie.overview,
		popularity: movie.popularity,
		posterPath: movie.poster_path,
		productionCompanies: movie.production_companies,
		productionCountries: movie.production_countries,
		releaseDate: movie.release_date,
		revenue: movie.revenue,
		runtime: movie.runtime,
		spokenLanguages: movie.spoken_languages,
		status: movie.status,
		tagline: movie.tagline,
		title: movie.title,
		video: movie.video,
		voteAverage: movie.vote_average,
		voteCount: movie.vote_count
	});

	await db.insert(imdbMediaT).values({ movieId: movie.id });

	return json(
		await db.query.imdbMovieT.findFirst({
			where: (movie, { eq }) => eq(movie.movieId, movieId),
			with: {
				imdbMediaT: true
			}
		})
	);
};
