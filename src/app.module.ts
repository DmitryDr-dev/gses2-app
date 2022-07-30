import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExchangeApiModule } from './exchange-api/exchange-api.module';
import { RateModule } from './rate/rate.module';
import { DbBinaryTreeModule } from './database/db-binary-tree/db-binary-tree.module';
import { DbStorageModule } from './database/db-storage/db-storage.module';
import { LocalDbModule } from './database/local-db/local-db.module';
import { MailModule } from './mail/mail.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ExchangeApiModule,
    RateModule,
    DbBinaryTreeModule,
    DbStorageModule,
    LocalDbModule,
    MailModule,
    SubscriptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
