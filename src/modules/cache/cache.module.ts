import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import EnvVariable from '../config/env-variable.enum';

@Module({
  imports: [
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          type: 'single',
          url: configService.get(EnvVariable.REDIS_URL),
        };
      },
    }),
  ],
})
export default class CacheModule {}
