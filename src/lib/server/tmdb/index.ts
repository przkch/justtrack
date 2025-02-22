import { env } from '$env/dynamic/private';

interface TMDBResponse {
	success: boolean;
	status_code: number;
	status_message: string;
}

interface MovieGenre {
	id: number;
	name: string;
}

interface ProductionCompany {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

interface SpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

export interface Movie {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: boolean;
	budget: number;
	genres: MovieGenre[];
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
			return <MovieResponse>{ response: { success: true }, movie: data };
		}
	}
}
