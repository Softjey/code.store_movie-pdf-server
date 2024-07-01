import { Controller, Get, Header, Res } from '@nestjs/common';
import { MovieService } from './services/movie.service';
import { Response } from 'express';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'inline; filename="movies_list.pdf"')
  async getPopularMoviesPdf(@Res() res: Response) {
    const pdfBuffer = await this.movieService.getPopularMoviesPdf();

    res.end(pdfBuffer, 'binary');
  }
}
