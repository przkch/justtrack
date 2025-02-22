import { db } from '$lib/server/db';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const recentMovies = await db.query.imdbMovieT.findMany({
		limit: 6,
		orderBy: (movie, { desc }) => [desc(movie.createdAt)]
	});

	return { recentMovies: recentMovies };
};
