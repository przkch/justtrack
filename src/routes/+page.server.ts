import { db } from '$lib/server/db';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	let mediaLimit = 6;

	const recentMovies = await db.query.imdbMovieT.findMany({
		limit: mediaLimit,
		orderBy: (movie, { desc }) => [desc(movie.createdAt)]
	});
	const recentTv = await db.query.imdbTvT.findMany({
		limit: mediaLimit,
		orderBy: (tv, { desc }) => [desc(tv.createdAt)]
	});

	return { recentMovies: recentMovies, recentTv: recentTv };
};
