import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './modules/movie/movie.module';
import { PdfModule } from './modules/pdf/pdf.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MovieModule, PdfModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
