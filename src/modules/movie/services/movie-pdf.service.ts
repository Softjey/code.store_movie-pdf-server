import { PdfService } from 'src/modules/pdf/pdf.service';
import Movie from '../types/movie.interface';
import { DetailedMovie } from '../types/detailed-movie.interface';
import MoviePaths from '../utils/movie-paths.enum';

export default class MoviePdfService {
  constructor(private readonly pdfService: PdfService) {}

  createMoviesListPDF(movies: Pick<Movie, 'id' | 'title' | 'vote_average' | 'release_date'>[]) {
    return this.pdfService.generateBuffer((pdf) => {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.text('Popular Movies List', 10, 20);

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      let y = 30;

      movies.forEach((movie) => {
        if (y > 280) {
          pdf.addPage();

          y = 10;
        }

        const { title, release_date, vote_average } = movie;

        pdf.setTextColor(0, 0, 255);
        pdf.textWithLink(title, 10, y, { url: `/${MoviePaths.MOVIES}/${movie.id}` });
        pdf.setTextColor(0, 0, 0);

        pdf.setFontSize(10);
        pdf.text(`Release Date: ${release_date}`, 15, y + 6);
        pdf.text(`Rating: ${vote_average}`, 15, y + 12);

        y += 20;
      });
    });
  }

  createMoviePDF(
    movie: Pick<DetailedMovie, 'title' | 'release_date' | 'vote_average' | 'poster_path'>,
  ) {
    return this.pdfService.generateBuffer((pdf) => {
      const { poster_path, release_date, title, vote_average } = movie;

      pdf.text(poster_path, 10, 10);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.text(title, 10, 20);

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      const y = 30;

      pdf.text(`Release Date: ${release_date}`, 10, y);
      pdf.text(`Rating: ${vote_average}`, 10, y + 6);
    });
  }
}
