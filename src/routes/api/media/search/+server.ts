import { db } from '$lib/server/db';
import { imdbMovieT, imdbMediaT, imdbTvT } from '$lib/server/db/schema';
import { TMDB } from '$lib/server/tmdb';

import { eq, ilike, or } from 'drizzle-orm';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('query');

	if (!query || query === '') return json([]);

	const result = await db
		.select()
		.from(imdbMediaT)
		.where(or(ilike(imdbMovieT.title, `%${query}%`), ilike(imdbTvT.name, `%${query}%`)))
		.leftJoin(imdbMovieT, eq(imdbMediaT.movieId, imdbMovieT.movieId))
		.leftJoin(imdbTvT, eq(imdbMediaT.tvId, imdbTvT.tvId));

	return json(result);
};
