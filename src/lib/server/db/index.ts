import * as schema from '$lib/server/db/schema';

import { building } from '$app/environment';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';

if (!building && !env.DATABASE_URL) {
	throw new Error('DATABASE_URL is not set');
}

const client = postgres(env.DATABASE_URL);

export const db = drizzle({
	client: client,
	schema: schema
});
