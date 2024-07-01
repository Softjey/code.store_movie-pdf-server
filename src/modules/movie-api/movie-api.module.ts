import { Module } from '@nestjs/common';
import MovieApiService from './movie-api.service';

@Module({
  providers: [MovieApiService],
  exports: [MovieApiService],
})
export class MovieApiModule {}
