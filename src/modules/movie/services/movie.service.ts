import { Injectable } from '@nestjs/common';
import MovieApiService from './movie-api.service';
import { PdfService } from 'src/modules/pdf/pdf.service';

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

    return pdfBuffer;
  }
}
