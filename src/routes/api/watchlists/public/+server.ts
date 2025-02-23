import { db } from '$lib/server/db';

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return json(
		await db.query.watchlistT.findMany({
			where: (watchlist, { eq }) => eq(watchlist.isPublic, true),
			with: {
				watchlistItemT: true,
				user: true
			}
		})
	);
};
