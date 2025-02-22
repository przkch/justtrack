import { db } from '$lib/server/db';
import { imdbMovieT } from '$lib/server/db/schema';
import { TMDB } from '$lib/server/tmdb';

import { eq } from 'drizzle-orm';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const movieId = Number(params.movieId);

	const dbResult = await db.query.imdbMovieT.findFirst({
		where: (movie, { eq }) => eq(movie.movieId, movieId)
	});

	if (dbResult) return json(dbResult);

	console.info('[/api/movie]: movie not found in the database, fetching from TMDB');

	const tmdbResponse = await TMDB.getMovie(movieId);

	// console.log(`[/api/movie] movie from TMDB: %o`, tmdbResponse);

	if (!tmdbResponse || tmdbResponse.response.success === false) {
		console.error('[/api/movie] movie not found in the TMDB as well');
		error(404, tmdbResponse.response.status_message);
	}

	const movie = tmdbResponse.movie;

	await db.insert(imdbMovieT).values({
		movieId: movie.id,
		ImdbId: movie.imdb_id,
		title: movie.title,
		originalTitle: movie.original_title,
		overview: movie.overview,
		posterPath: movie.poster_path,
		adult: movie.adult,
		originalLanguage: movie.original_language,
		genreIds: movie.genres.flatMap((genre) => genre.id),
		popularity: movie.popularity,
		releaseDate: movie.release_date,
		voteAverage: movie.vote_average,
		voteCount: movie.vote_count,
		originCountry: movie.origin_country
	});

	return json(
		await db.query.imdbMovieT.findFirst({
			where: (movie, { eq }) => eq(movie.movieId, movieId)
		})
	);
};
