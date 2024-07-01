import { Injectable } from '@nestjs/common';
import MovieApiService from './movie-api.service';
import { PdfService } from 'src/modules/pdf/pdf.service';
import Movie from '../types/movie.interface';

@Injectable()
export class MovieService {
  constructor(
    private readonly movieApiService: MovieApiService,
    private readonly pdfService: PdfService,
  ) {}

  async getPopularMoviesPdf() {
    const { results: movies } = await this.movieApiService.fetchPopularMovies();
    const pdfArrayBuffer = await this.pdfService.createMoviesListPDF(movies);
    const pdfBuffer = Buffer.from(pdfArrayBuffer);

    return {
      pdfBuffer,
      movies,
    };
  }

  async getMoviePdfById(id: Movie['id']) {
    const movie = await this.movieApiService.fetchMovieById(id);
    const pdfArrayBuffer = await this.pdfService.createMoviePDF(movie);
    const pdfBuffer = Buffer.from(pdfArrayBuffer);

    return {
      pdfBuffer,
      movie,
    };
  }
}
