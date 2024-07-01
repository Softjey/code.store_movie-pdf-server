import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './modules/movie/movie.module';
import CacheModule from './modules/cache/cache.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CacheModule, MovieModule],
})
export class AppModule {}
