import type {
	CreatedBy,
	Episode,
	Genre,
	Network,
	ProductionCompany,
	ProductionCountry,
	Season,
	SpokenLanguage
} from '$lib/server/tmdb';

import {
	boolean,
	timestamp,
	pgTable,
	text,
	primaryKey,
	integer,
	date,
	json,
	customType,
	serial,
	pgEnum,
	unique
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from '@auth/core/adapters';
import { relations, sql } from 'drizzle-orm';

type NumericConfig = {
	precision?: number;
	scale?: number;
};

export const numericCasted = customType<{
	data: number;
	driverData: string;
	config: NumericConfig;
}>({
	dataType: (config) => {
		if (config?.precision && config?.scale) {
			return `numeric(${config.precision}, ${config.scale})`;
		}
		return 'numeric';
	},
	fromDriver: (value: string) => Number.parseFloat(value), // note: precision loss for very large/small digits so area to refactor if needed
	toDriver: (value: number) => value.toString()
});

export const watchlistTypeE = pgEnum('watchlist_type_e', ['movie', 'tv', 'both']);

const timestamps = {
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
};

export const users = pgTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name'),
	email: text('email').unique(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image')
});

export const accounts = pgTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccountType>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state')
	},
	(account) => [
		{
			compoundKey: primaryKey({
				columns: [account.provider, account.providerAccountId]
			})
		}
	]
);

export const sessions = pgTable('session', {
	sessionToken: text('sessionToken').primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull()
});

export const verificationTokens = pgTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull()
	},
	(verificationToken) => [
		{
			compositePk: primaryKey({
				columns: [verificationToken.identifier, verificationToken.token]
			})
		}
	]
);

export const authenticators = pgTable(
	'authenticator',
	{
		credentialID: text('credentialID').notNull().unique(),
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		providerAccountId: text('providerAccountId').notNull(),
		credentialPublicKey: text('credentialPublicKey').notNull(),
		counter: integer('counter').notNull(),
		credentialDeviceType: text('credentialDeviceType').notNull(),
		credentialBackedUp: boolean('credentialBackedUp').notNull(),
		transports: text('transports')
	},
	(authenticator) => [
		{
			compositePK: primaryKey({
				columns: [authenticator.userId, authenticator.credentialID]
			})
		}
	]
);

const commonMediaColumns = {
	adult: boolean('adult'),
	backdropPath: text('backdrop_path'),
	genres: json('genres').$type<Genre[]>(),
	homepage: text('homepage'),
	originCountry: json('origin_country').$type<string[]>(),
	originalLanguage: text('original_language'),
	overview: text('overview'),
	popularity: numericCasted('popularity'),
	posterPath: text('poster_path'),
	productionCompanies: json('production_companies').$type<ProductionCompany[]>(),
	productionCountries: json('production_countries').$type<ProductionCountry[]>(),
	spokenLanguages: json('spoken_languages').$type<SpokenLanguage[]>(),
	status: text('status'),
	tagline: text('tagline'),
	voteAverage: numericCasted('vote_average'),
	voteCount: integer('vote_count')
};

export const imdbMovieT = pgTable('imdb_movie_t', {
	...timestamps,
	...commonMediaColumns,
	belongsToCollection: boolean('belongs_to_collection'),
	budget: integer('budget'),
	imdbId: text('imdb_id'),
	movieId: integer('movie_id').primaryKey(),
	originalTitle: text('original_title'),
	releaseDate: date('release_date'),
	revenue: integer('revenue'),
	runtime: integer('runtime'),
	title: text('title'),
	video: boolean('video')
});

export const imdbMediaT = pgTable('imdb_media_t', {
	itemId: serial('item_id').primaryKey().notNull(),
	movieId: integer('movie_id')
		.references(() => imdbMovieT.movieId)
		.unique(),
	tvId: integer('tv_id')
		.references(() => imdbTvT.tvId)
		.unique()
});

export const imdbTvT = pgTable('imdb_tv_t', {
	...timestamps,
	...commonMediaColumns,
	createdBy: json('created_by').$type<CreatedBy[]>(),
	episodeRunTime: json('episode_run_time').$type<number[]>(),
	firstAirDate: date('first_air_date'),
	inProduction: boolean('is_production'),
	languages: json('languages').$type<string[]>(),
	lastAirDate: date('last_air_date'),
	lastEpisodeToAir: json('last_episode_to_air').$type<Episode>(),
	name: text('name'),
	nextEpisodeToAir: json('next_episode_to_air').$type<Episode>(),
	networks: json('networks').$type<Network[]>(),
	numberOfEpisodes: integer('number_of_episodes'),
	numberOfSeasons: integer('number_of_seasons'),
	originalName: text('original_name'),
	seasons: json('seasons').$type<Season[]>(),
	tvId: integer('tv_id').primaryKey(),
	type: text('type')
});

export const watchlistT = pgTable('watchlist_t', {
	...timestamps,
	watchlistId: serial('watchlist_id').primaryKey().notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	name: text('name').notNull(),
	isPublic: boolean('is_public').default(false).notNull(),
	type: watchlistTypeE('type').notNull()
});

export const watchlistItemT = pgTable(
	'watchlist_item_t',
	{
		...timestamps,
		watchlistItemId: serial('watchlist_item_id').primaryKey().notNull(),
		watchlistId: integer('watchlist_id')
			.notNull()
			.references(() => watchlistT.watchlistId),
		itemId: integer('item_id')
			.notNull()
			.references(() => imdbMediaT.itemId)
	},
	(table) => [unique().on(table.watchlistId, table.itemId)]
);

export const imdbMediaTRelations = relations(imdbMediaT, ({ one, many }) => ({
	imdbMovieT: one(imdbMovieT, {
		fields: [imdbMediaT.movieId],
		references: [imdbMovieT.movieId]
	}),
	imdbTvT: one(imdbTvT, {
		fields: [imdbMediaT.tvId],
		references: [imdbTvT.tvId]
	}),
	watchlistItemT: many(watchlistItemT)
}));

export const imdbMovieTRelations = relations(imdbMovieT, ({ one }) => ({
	imdbMediaT: one(imdbMediaT)
}));

export const imdbTvTRelations = relations(imdbTvT, ({ one }) => ({
	imdbMediaT: one(imdbMediaT)
}));

export const watchlistTRelations = relations(watchlistT, ({ one, many }) => ({
	user: one(users, {
		fields: [watchlistT.userId],
		references: [users.id]
	}),
	watchlistItemT: many(watchlistItemT)
}));

export const watchlistItemTRelations = relations(watchlistItemT, ({ one }) => ({
	imdbMediaT: one(imdbMediaT, {
		fields: [watchlistItemT.itemId],
		references: [imdbMediaT.itemId]
	}),
	watchlistT: one(watchlistT, {
		fields: [watchlistItemT.watchlistId],
		references: [watchlistT.watchlistId]
	})
}));
