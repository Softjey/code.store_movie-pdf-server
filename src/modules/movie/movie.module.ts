import { Module } from '@nestjs/common';
import MovieApiService from './services/movie-api.service';
import { MovieService } from './services/movie.service';
import { MovieController } from './movie.controller';
import { PdfModule } from '../pdf/pdf.module';

@Module({
  imports: [PdfModule],
  providers: [MovieApiService, MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
