import { PdfService } from 'src/modules/pdf/pdf.service';
import MoviePaths from '../utils/movie-paths.enum';
import jsPDF from 'jspdf';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import EnvVariable from 'src/modules/config/env-variable.enum';
import { DetailedMovieEntry, MovieEntry } from '../types/movie.types';

@Injectable()
export default class MoviePdfService {
  private readonly apiImgBaseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly pdfService: PdfService,
  ) {
    this.apiImgBaseUrl = this.configService.get(EnvVariable.MOVIE_API_IMAGE_URL)!;
  }

  private addMovieEntry(
    pdf: jsPDF,
    { id, title, release_date, vote_average }: MovieEntry,
    y: number,
  ): number {
    pdf.setTextColor(0, 0, 255);
    pdf.textWithLink(title, 10, y, { url: `/${MoviePaths.MOVIES}/${id}` });

    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Release Date: ${release_date}`, 15, y + 6);
    pdf.text(`Rating: ${vote_average}`, 15, y + 12);

    return y + 20;
  }

  createMoviesListPDF(movies: MovieEntry[]) {
    return this.pdfService.generateBuffer((pdf) => {
      let y = 30;

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.text('Popular Movies List', 10, 20);

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');

      movies.forEach((movie) => {
        if (y > 280) {
          pdf.addPage();
          y = 10;
        }

        y = this.addMovieEntry(pdf, movie, y);
      });
    });
  }

  createMoviePDF({ poster_path, release_date, title, vote_average }: DetailedMovieEntry) {
    return this.pdfService.generateBuffer(async (pdf) => {
      let y = 10;
      const imgBase64 = await this.pdfService.getBase64FromUrl(
        `${this.apiImgBaseUrl}/original${poster_path}`,
      );

      pdf.addImage(imgBase64, 'JPEG', 10, y, 75, 100);

      y += 110;

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.text(title, 10, y);

      y += 8;

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');

      pdf.text(`Release Date: ${release_date}`, 10, y);
      pdf.text(`Rating: ${vote_average}`, 10, y + 6);
    });
  }
}
