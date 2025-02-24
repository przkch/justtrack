import { db } from '$lib/server/db';
import { watchlistItemT, watchlistT, watchlistTypeE } from '$lib/server/db/schema';

import { and, eq, inArray } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url }) => {
	const session = await locals.auth();
	const mediaType = url.searchParams.get('mediaType') as (typeof watchlistTypeE.enumValues)[number];

	const filters = [eq(watchlistT.userId, session!.user!.id!)];

	if (mediaType && watchlistTypeE.enumValues.includes(mediaType)) {
		filters.push(inArray(watchlistT.type, [mediaType, 'both']));
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

	let type: (typeof watchlistTypeE.enumValues)[number];

	if (
		formData.getAll('mediaType').length > 1 &&
		formData.getAll('mediaType').some((ele) => ['movie', 'tv'].includes(String(ele)))
	) {
		type = 'both';
	} else {
		type = String(formData.get('mediaType')) as (typeof watchlistTypeE.enumValues)[number];
	}

	const [newWatchlist] = await db
		.insert(watchlistT)
		.values({
			name: String(formData.get('name')),
			userId: String(session?.user?.id),
			type: type,
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
