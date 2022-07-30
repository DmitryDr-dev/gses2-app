import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExchangeApiModule } from './exchange-api/exchange-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ExchangeApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
