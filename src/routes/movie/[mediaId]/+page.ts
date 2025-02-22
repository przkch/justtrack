import type { imdbMovieT } from '$lib/server/db/schema';

import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const mediaId = Number(params.mediaId);

	const res = await fetch(`/api/movie/${mediaId}`);
	const data = await res.json();

	if (!res.ok) {
		error(404, data.message ?? res.statusText);
	}

	return { movie: <typeof imdbMovieT.$inferSelect>data };
};
