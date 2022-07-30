import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExchangeApiModule } from './exchange-api/exchange-api.module';
import { RateModule } from './rate/rate.module';
import { DbBinaryTreeModule } from './database/db-binary-tree/db-binary-tree.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ExchangeApiModule,
    RateModule,
    DbBinaryTreeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
