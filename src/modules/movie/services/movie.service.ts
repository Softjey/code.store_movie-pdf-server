import { Injectable } from '@nestjs/common';
import MovieApiService from './movie-api.service';
import Movie from '../types/movie.interface';
import MoviePdfService from './movie-pdf.service';

@Injectable()
export class MovieService {
  constructor(
    private readonly movieApiService: MovieApiService,
    private readonly moviePdfService: MoviePdfService,
  ) {}

  async getPopularMoviesPdf() {
    const { results: movies } = await this.movieApiService.fetchPopularMovies();
    const pdfBuffer = this.moviePdfService.createMoviesListPDF(movies);

    return {
      pdfBuffer,
      movies,
    };
  }

  async getMoviePdfById(id: Movie['id']) {
    const movie = await this.movieApiService.fetchMovieById(id);
    const pdfBuffer = this.moviePdfService.createMoviePDF(movie);

    return {
      pdfBuffer,
      movie,
    };
  }
}
