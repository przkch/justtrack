import type { imdbMediaT, imdbTvT } from '$lib/server/db/schema';

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const tvId = Number(params.tvId);

	const res = await fetch(`/api/tv/${tvId}`);
	const data = await res.json();

	if (!res.ok) {
		error(404, data.message ?? res.statusText);
	}

	return {
		tv: <typeof imdbTvT.$inferSelect & { imdbMediaT: typeof imdbMediaT.$inferSelect }>data.tv
	};
};
