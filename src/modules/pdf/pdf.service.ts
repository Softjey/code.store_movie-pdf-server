import { Injectable } from '@nestjs/common';
import { jsPDF } from 'jspdf';
import Movie from '../movie/types/movie.interface';

@Injectable()
export class PdfService {
  createMoviesListPDF(movies: Pick<Movie, 'id' | 'title' | 'vote_average' | 'release_date'>[]) {
    const pdf = new jsPDF();

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
      pdf.textWithLink(title, 10, y, {
        url: `https://www.themoviedb.org/movie/${movie.id}`,
      });
      pdf.setTextColor(0, 0, 0);

      pdf.setFontSize(10);
      pdf.text(`Release Date: ${release_date}`, 15, y + 6);
      pdf.text(`Rating: ${vote_average}`, 15, y + 12);

      y += 20;
    });

    return pdf.output('arraybuffer');
  }
}
