import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { LocalDbModule } from 'src/database/local-db/local-db.module';
import { MailModule } from 'src/mail/mail.module';
import { ExchangeApiModule } from 'src/exchange-api/exchange-api.module';

@Module({
  imports: [LocalDbModule, MailModule, ExchangeApiModule],
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
