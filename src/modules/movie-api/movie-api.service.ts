import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import EnvVariable from '../config/config.types';
import axios, { AxiosInstance } from 'axios';
import PopularMoviesResponse from './types/popular-movies.response';
import Movie from './types/movie.interface';
import { DetailedMovie } from './types/detailed-movie.interface';

@Injectable()
export default class MovieApiService {
  private axios: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get(EnvVariable.API_KEY);

    this.axios = axios.create({
      baseURL: 'https://api.themoviedb.org/3',
      params: { api_key: apiKey },
    });
  }

  async fetchPopularMovies() {
    const { data: moviesResponse } = await this.axios.get<PopularMoviesResponse>('movie/popular');

    return moviesResponse;
  }

  async fetchMovieById(id: Movie['id']) {
    const { data: movie } = await this.axios.get<DetailedMovie>(`/movie/${id}`);

    return movie;
  }
}
