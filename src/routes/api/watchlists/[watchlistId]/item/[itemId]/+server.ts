import { db } from '$lib/server/db';
import { watchlistItemT, watchlistT, watchlistTypeE } from '$lib/server/db/schema';

import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ locals, params }) => {
	const session = await locals.auth();
	const watchlistId = Number(params.watchlistId);
	const itemId = Number(params.itemId);

	const watchlist = await db.query.watchlistT.findFirst({
		where: (watchlist, { and, eq }) =>
			and(eq(watchlist.userId, session?.user?.id!), eq(watchlist.watchlistId, watchlistId))
	});

	if (!watchlist) {
		throw error(401);
	}

	const [newItem] = await db
		.insert(watchlistItemT)
		.values({
			watchlistId: watchlistId,
			itemId: itemId
		})
		.returning();

	return json(newItem);
};
