import { db } from '$lib/server/db';

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, params }) => {
	const watchlistId = Number(params.watchlistId);

	return json(
		await db.query.watchlistT.findFirst({
			where: (watchlist, { and, eq }) =>
				and(eq(watchlist.isPublic, true), eq(watchlist.watchlistId, watchlistId)),
			with: {
				watchlistItemT: {
					with: {
						imdbMediaT: {
							with: {
								imdbMovieT: true,
								imdbTvT: true
							}
						}
					}
				},
				user: true
			}
		})
	);
};
