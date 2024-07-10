export interface tmdbSearchResult {
    backdrop_path: string;
    id: number;
    original_name?: string;
    overview: string;
    poster_path?: string;
    media_type: string;
    adult: boolean;
    name?: string;
    title?: string;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    first_air_date?: string;
    release_date?: string;
    vote_average: number;
    vote_count: number;
    origin_country: string[];
}
