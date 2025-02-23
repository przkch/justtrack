import { db } from '$lib/server/db';

import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';

export const { handle } = SvelteKitAuth({
	adapter: DrizzleAdapter(db),
	providers: [GitHub],
	trustHost: true,
	callbacks: {
		session({ session, user }) {
			session.user.id = user.id;
			return session;
		}
	}
});
