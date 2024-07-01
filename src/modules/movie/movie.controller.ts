import { Controller, Get, Header, Param, ParseIntPipe, Res } from '@nestjs/common';
import { MovieService } from './services/movie.service';
import { Response } from 'express';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'inline; filename="movies_list.pdf"')
  async getPopularMoviesPdf(@Res() res: Response) {
    const { pdfBuffer } = await this.movieService.getPopularMoviesPdf();

    res.end(pdfBuffer, 'binary');
  }

  @Get(':id')
  @Header('Content-Type', 'application/pdf')
  async getMoviePdfById(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const { movie, pdfBuffer } = await this.movieService.getMoviePdfById(id);

    res.setHeader('Content-Disposition', `inline; filename="movie-${movie.title}-${movie.id}.pdf"`);
    res.end(pdfBuffer, 'binary');
  }
}