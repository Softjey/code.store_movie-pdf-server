import { Injectable } from '@nestjs/common';
import MovieApiService from './movie-api.service';
import Movie from '../types/movie.interface';
import MoviePdfService from './movie-pdf.service';
import MovieCacheService from './movie-cache.service';
import { PdfDetailedMovieData, PdfMoviesData } from '../types/movie.types';

@Injectable()
export class MovieService {
  constructor(
    private readonly movieCacheService: MovieCacheService,
    private readonly movieApiService: MovieApiService,
    private readonly moviePdfService: MoviePdfService,
  ) {}

  async getPopularMoviesPdf(): Promise<PdfMoviesData> {
    const moviesFromCache = await this.movieCacheService.getPopularMoviesBuffer();

    if (moviesFromCache) {
      return moviesFromCache;
    }

    const { results: movies } = await this.movieApiService.fetchPopularMovies();
    const pdf = await this.moviePdfService.createMoviesListPDF(movies);
    const pdfMoviesData = { pdf, movies };

    this.movieCacheService.setPopularMoviesBuffer(pdfMoviesData);

    return pdfMoviesData;
  }

  async getMoviePdfById(id: Movie['id']): Promise<PdfDetailedMovieData> {
    const movieFromCache = await this.movieCacheService.getMovieByIdBuffer(id);

    if (movieFromCache) {
      return movieFromCache;
    }

    const movie = await this.movieApiService.fetchMovieById(id);
    const pdf = await this.moviePdfService.createMoviePDF(movie);
    const pdfMovieData = { pdf, movie };

    this.movieCacheService.setMovieByIdBuffer(id, pdfMovieData);

    return pdfMovieData;
  }
}
