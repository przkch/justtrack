import { db } from '$lib/server/db';
import { watchlistT } from '$lib/server/db/schema';

import { eq } from 'drizzle-orm';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, params }) => {
	const session = await locals.auth();
	const watchlistId = Number(params.watchlistId);

	return json(
		await db.query.watchlistT.findFirst({
			where: (watchlist, { and, eq }) =>
				and(eq(watchlist.userId, session!.user!.id!), eq(watchlist.watchlistId, watchlistId)),
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
				}
			}
		})
	);
};

export const POST: RequestHandler = async ({ locals, params, request }) => {
	const session = await locals.auth();
	const watchlistId = Number(params.watchlistId);

	const watchlist = await db.query.watchlistT.findFirst({
		where: (watchlist, { and, eq }) =>
			and(eq(watchlist.userId, session?.user?.id!), eq(watchlist.watchlistId, watchlistId))
	});

	if (!watchlist) {
		throw error(401);
	}

	const formData = await request.formData();

	const [updatedWatchlist] = await db
		.update(watchlistT)
		.set({
			name: String(formData.get('name')),
			isPublic: formData.get('isPublic') === 'true'
		})
		.where(eq(watchlistT.watchlistId, watchlistId))
		.returning();

	return json(
		await db.query.watchlistT.findFirst({
			where: (watchlist, { and, eq }) =>
				and(
					eq(watchlist.userId, session!.user!.id!),
					eq(watchlist.watchlistId, updatedWatchlist.watchlistId)
				),
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
				}
			}
		})
	);
};
