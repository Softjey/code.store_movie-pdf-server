import { DetailedMovie } from './detailed-movie.interface';
import Movie from './movie.interface';

export type MovieEntry = Pick<Movie, 'id' | 'title' | 'vote_average' | 'release_date'>;
export type DetailedMovieEntry = Pick<
  DetailedMovie,
  'title' | 'release_date' | 'vote_average' | 'poster_path'
>;
export type PdfMoviesData = { movies: Movie[]; pdf: Buffer };
export type PdfDetailedMovieData = { movie: DetailedMovie; pdf: Buffer };
