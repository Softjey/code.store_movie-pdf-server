import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MovieApiModule } from './modules/movie-api/movie-api.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MovieApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
