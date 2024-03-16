export interface IMovieResponse {
    results: IMovieCard[];
    total_pages: number;
    total_results: number;
}

export interface IMovieCard {
    response: IMovieCardResponse
    id: number,
}

interface IMovieCardResponse {
    poster_path?: string,
    title?: string,
    vote_average?: number,
    id?: number
}