import type {
	watchlistT,
	watchlistItemT,
	imdbMediaT,
	imdbMovieT,
	imdbTvT
} from '$lib/server/db/schema';

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const watchlistId = Number(params.watchlistId);

	const res = await fetch(`/api/watchlists/${watchlistId}`);
	const data = await res.json();

	if (!res.ok) {
		error(404, data.message ?? res.statusText);
	}

	return {
		watchlist: <
			typeof watchlistT.$inferSelect & {
				watchlistItemT: (typeof watchlistItemT.$inferSelect & {
					imdbMediaT: typeof imdbMediaT.$inferSelect & {
						imdbMovieT: typeof imdbMovieT.$inferSelect;
						imdbTvT: typeof imdbTvT.$inferSelect;
					};
				})[];
			}
		>data
	};
};
