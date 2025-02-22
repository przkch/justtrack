import { db } from '$lib/server/db';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const recentMovies = await db.query.imdbMovieT.findMany({
		limit: 6,
		orderBy: (movie, { desc }) => [desc(movie.createdAt)]
	});
	const recentTv = await db.query.imdbTvT.findMany({
		limit: 6,
		orderBy: (tv, { desc }) => [desc(tv.createdAt)]
	});

	return { recentMovies: recentMovies, recentTv: recentTv };
};
