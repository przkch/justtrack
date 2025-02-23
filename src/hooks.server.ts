import { redirect, error, type Handle } from '@sveltejs/kit';
import { handle as authenticationHandle } from './auth';
import { sequence } from '@sveltejs/kit/hooks';

const authRequiredRoutes = ['/api/watchlists', '/watchlists'];

const authorizationHandle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	const isApiRoute = pathname.startsWith('/api');

	if (authRequiredRoutes.includes(pathname)) {
		const session = await event.locals.auth();
		if (!session) {
			if (isApiRoute) {
				throw error(401);
			}
			throw redirect(303, '/auth/signin');
		}
	}

	return resolve(event);
};

export const handle: Handle = sequence(authenticationHandle, authorizationHandle);
