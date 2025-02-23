import { db } from '$lib/server/db';
import { watchlistT, watchlistTypeE } from '$lib/server/db/schema';

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, params }) => {
	const session = await locals.auth();
	const watchlistId = Number(params.watchlistId);

	return json(
		await db.query.watchlistT.findMany({
			where: (watchlist, { and, eq }) =>
				and(eq(watchlist.userId, session!.user!.id!), eq(watchlist.watchlistId, watchlistId)),
			with: {
				watchlistItemT: true
			}
		})
	);
};

export const POST: RequestHandler = async ({ locals, request }) => {
	const session = await locals.auth();
	const formData = await request.formData();

	await db.update(watchlistT).values({
		name: String(formData.get('name')),
		isPublic: formData.get('isPublic') === 'true'
	});

	return new Response(null, { status: 200 });
};
