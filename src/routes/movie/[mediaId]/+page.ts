import type { imdbMediaT, imdbMovieT } from '$lib/server/db/schema';

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const mediaId = Number(params.mediaId);

	const res = await fetch(`/api/movie/${mediaId}`);
	const data = await res.json();

	if (!res.ok) {
		error(404, data.message ?? res.statusText);
	}

	return {
		movie: <typeof imdbMovieT.$inferSelect & { imdbMediaT: typeof imdbMediaT.$inferSelect }>data
	};
};
