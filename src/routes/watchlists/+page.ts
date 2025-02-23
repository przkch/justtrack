import type { watchlistT, watchlistItemT } from '$lib/server/db/schema';

import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch(`/api/watchlists`);
	const data = await res.json();

	if (res.status === 401) throw redirect(303, '/auth/signin');

	if (!res.ok) throw error(404, data.message ?? res.statusText);

	return {
		watchlists: <
			(typeof watchlistT.$inferSelect & {
				watchlistItemT: (typeof watchlistItemT.$inferSelect)[];
			})[]
		>data
	};
};
