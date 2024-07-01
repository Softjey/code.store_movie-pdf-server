import { Module } from '@nestjs/common';
import MovieApiService from './services/movie-api.service';

@Module({
  providers: [MovieApiService],
  exports: [MovieApiService],
})
export class MovieModule {}
