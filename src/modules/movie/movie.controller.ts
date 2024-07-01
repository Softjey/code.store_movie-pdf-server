import { Controller, Get, Header, Param, ParseIntPipe, Res } from '@nestjs/common';
import { MovieService } from './services/movie.service';
import { Response } from 'express';
import MoviePaths from './utils/movie-paths.enum';

@Controller(MoviePaths.MOVIES)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'inline; filename="movies_list.pdf"')
  async getPopularMoviesPdf(@Res() res: Response) {
    const { pdf } = await this.movieService.getPopularMoviesPdf();

    res.end(pdf, 'binary');
  }

  @Get(':id')
  @Header('Content-Type', 'application/pdf')
  async getMoviePdfById(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const { movie, pdf } = await this.movieService.getMoviePdfById(id);

    res.setHeader('Content-Disposition', `inline; filename="movie-${movie.title}-${movie.id}.pdf"`);
    res.end(pdf, 'binary');
  }
}
