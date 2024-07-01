import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MovieApiModule } from './modules/movie-api/movie-api.module';
import { PdfModule } from './modules/pdf/pdf.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MovieApiModule, PdfModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
