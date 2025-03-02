import { TMDB } from '$lib/server/tmdb';

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('query');

	if (!query || query === '') return json([]);

	return json(await TMDB.searchMulti(query));
};
