import { Module } from '@nestjs/common';
import MovieApiService from './services/movie-api.service';
import { MovieService } from './services/movie.service';
import { MovieController } from './movie.controller';
import { PdfModule } from '../pdf/pdf.module';
import MoviePdfService from './services/movie-pdf.service';

@Module({
  imports: [PdfModule],
  providers: [MovieApiService, MovieService, MoviePdfService],
  controllers: [MovieController],
})
export class MovieModule {}
