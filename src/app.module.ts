import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './modules/movie/movie.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MovieModule],
})
export class AppModule {}
