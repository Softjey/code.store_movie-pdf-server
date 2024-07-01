import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import Movie from '../types/movie.interface';
import { PdfDetailedMovieData, PdfMoviesData } from '../types/movie.types';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export default class MovieCacheService {
  private readonly popularMoviesPrefix = 'popular-movies';
  private readonly moviePrefix = 'movie-pdf';

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async getPopularMoviesBuffer(): Promise<PdfMoviesData | null> {
    return this.getBuffer(this.popularMoviesPrefix) as Promise<PdfMoviesData | null>;
  }

  async getMovieByIdBuffer(id: Movie['id']): Promise<PdfDetailedMovieData | null> {
    return this.getBuffer(`${this.moviePrefix}:${id}`) as Promise<PdfDetailedMovieData | null>;
  }

  setPopularMoviesBuffer(data: PdfMoviesData) {
    this.setBuffer(this.popularMoviesPrefix, data, 1);
  }

  setMovieByIdBuffer(id: Movie['id'], data: PdfDetailedMovieData) {
    this.setBuffer(`${this.moviePrefix}:${id}`, data, 1);
  }

  private async getBuffer(key: string): Promise<PdfMoviesData | PdfDetailedMovieData | null> {
    const stringData = await this.redis.get(key);
    if (!stringData) return null;

    const parsedData = JSON.parse(stringData);
    if ('pdf' in parsedData) {
      parsedData.pdf = Buffer.from(parsedData.pdf, 'base64');
    }
    return parsedData;
  }

  private setBuffer(key: string, data: PdfMoviesData | PdfDetailedMovieData, ttl: number) {
    const dataToSave = { ...data, pdf: data.pdf.toString('base64') };
    this.redis.set(key, JSON.stringify(dataToSave), 'EX', ttl * 60);
  }
}
