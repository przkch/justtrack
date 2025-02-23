import { db } from '$lib/server/db';
import { watchlistT, watchlistTypeE } from '$lib/server/db/schema';

import { and, eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url }) => {
	const session = await locals.auth();
	const mediaType = url.searchParams.get('mediaType') as (typeof watchlistTypeE.enumValues)[number];

	const filters = [eq(watchlistT.userId, session!.user!.id!)];

	if (mediaType && watchlistTypeE.enumValues.includes(mediaType)) {
		filters.push(eq(watchlistT.type, mediaType));
	}

	return json(
		await db.query.watchlistT.findMany({
			where: and(...filters),
			with: {
				watchlistItemT: true
			}
		})
	);
};

export const PUT: RequestHandler = async ({ locals, request }) => {
	const session = await locals.auth();
	const formData = await request.formData();

	const [newWatchlist] = await db
		.insert(watchlistT)
		.values({
			name: String(formData.get('name')),
			userId: String(session?.user?.id),
			type: String(formData.get('mediaType')) as (typeof watchlistTypeE.enumValues)[number],
			isPublic: formData.get('isPublic') === 'true'
		})
		.returning();

	return json(
		await db.query.watchlistT.findFirst({
			where: (watchlist, { eq }) => eq(watchlist.watchlistId, newWatchlist.watchlistId),
			with: {
				watchlistItemT: true
			}
		})
	);
};
