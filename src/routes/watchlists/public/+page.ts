import type { watchlistT, watchlistItemT, users } from '$lib/server/db/schema';

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch(`/api/watchlists/public`);
	const data = await res.json();

	if (!res.ok) throw error(404, data.message ?? res.statusText);

	return {
		watchlists: <
			(typeof watchlistT.$inferSelect & {
				watchlistItemT: (typeof watchlistItemT.$inferSelect)[];
				user: typeof users.$inferSelect;
			})[]
		>data
	};
};
