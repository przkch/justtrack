import { db } from '$lib/server/db';
import { watchlistT, watchlistTypeE } from '$lib/server/db/schema';

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	const session = await locals.auth();

	return json(
		await db.query.watchlistT.findMany({
			where: (watchlist, { eq }) => eq(watchlist.userId, session!.user!.id!),
			with: {
				watchlistItemT: true
			}
		})
	);
};

export const PUT: RequestHandler = async ({ locals, request }) => {
	const session = await locals.auth();
	const formData = await request.formData();

	const newWatchlist = await db
		.insert(watchlistT)
		.values({
			name: String(formData.get('name')),
			userId: String(session?.user?.id),
			type: String(formData.get('mediaType')) as (typeof watchlistTypeE.enumValues)[number],
			isPublic: formData.get('isPublic') === 'true'
		})
		.returning();

	return json(newWatchlist);
};
