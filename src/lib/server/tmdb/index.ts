import { env } from '$env/dynamic/private';

interface TMDBResponse {
	success: boolean;
	status_code: number;
	status_message: string;
}

export interface Genre {
	id: number;
	name: string;
}

export interface ProductionCompany {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

export interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

export interface SpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

export interface CreatedBy {
	id: number;
	credit_id: string;
	name: string;
	original_name: string;
	gender: number;
	profile_path: string;
}

export interface Episode {
	id: number;
	name: string;
	overview: string;
	vote_average: number;
	vote_count: number;
	air_date: string;
	episode_number: number;
	episode_type: string;
	production_code: string;
	runtime: number;
	season_number: number;
	show_id: number;
	still_path: string;
}

export interface Network {
	id: number;
	logo_path: number;
	name: string;
	origin_country: string;
}

export interface Season {
	air_date: string;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	season_number: number;
	vote_average: number;
}

export interface Movie {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: boolean;
	budget: number;
	genres: Genre[];
	homepage: string;
	id: number;
	imdb_id: string;
	origin_country: string[];
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface MovieResponse {
	response: TMDBResponse;
	movie: Movie;
}

export interface Tv {
	adult: boolean;
	backdrop_path: string;
	created_by: CreatedBy[];
	episode_run_time: number[];
	first_air_date: string;
	genres: Genre[];
	homepage: string;
	id: number;
	in_production: boolean;
	languages: string[];
	last_air_date: string;
	last_episode_to_air: Episode;
	name: string;
	next_episode_to_air: Episode;
	networks: Network[];
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	seasons: Season[];
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	type: string;
	vote_average: number;
	vote_count: number;
}

export interface TvResponse {
	response: TMDBResponse;
	tv: Tv;
}

export class TMDB {
	static async get(endpoint: string): Promise<Response> {
		const url = `https://api.themoviedb.org/3${endpoint}`;
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${env.TMDB_TOKEN}`
			}
		});

		return res;
	}

	static async getMovie(movieId: number): Promise<MovieResponse> {
		const res = await TMDB.get(`/movie/${movieId}`);
		const data = await res.json();
		if (data.success === false) {
			return <MovieResponse>{ response: data };
		} else {
			console.debug(data);
			return <MovieResponse>{ response: { success: true }, movie: data };
		}
	}

	static async getTv(tvId: number): Promise<TvResponse> {
		const res = await TMDB.get(`/tv/${tvId}`);
		const data = await res.json();
		if (data.success === false) {
			return <TvResponse>{ response: data };
		} else {
			return <TvResponse>{ response: { success: true }, tv: data };
		}
	}
}
