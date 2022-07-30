import { Injectable, Logger } from '@nestjs/common';
import { LocalDbName } from 'src/common/constants';
import { LocalDbService } from 'src/database/local-db/local-db.service';
import { ExchangeApiService } from 'src/exchange-api/exchange-api.service';
import { MailService } from 'src/mail/mail.service';
import { SubscriptionMapper } from './map';
import { IExchangeRate } from './interfaces';

@Injectable()
export class SubscriptionService {
  private readonly logger = new Logger(SubscriptionService.name);

  constructor(
    private localDbService: LocalDbService,
    private mailService: MailService,
    private exchangeApiService: ExchangeApiService,
  ) {}

  public async addNewEmail(email: string) {
    try {
      const result = await this.localDbService.addOne(LocalDbName.Email, email);
      return result;
    } catch (error) {
      this.logger.error(
        `Error occurred while creating new contact': ${error.message}`,
      );
    }
  }

  public async sendEmails() {
    try {
      const emails = await this.localDbService.findAll(LocalDbName.Email);
      if (!emails) {
        return null;
      }

      const exchangeRate = await this.exchangeApiService.getCurrencyConversion(
        'BTC',
        'UAH',
      );
      if (!exchangeRate) {
        return null;
      }

      const exchangeMap = SubscriptionMapper.toSendEmailsDto(exchangeRate);

      const result = await this.massMailer(
        emails as Array<string>,
        exchangeMap,
      );

      return result;
    } catch (error) {
      this.logger.error(
        `Error occurred while sending emails: ${error.message}`,
      );
      return null;
    }
  }

  public async massMailer(emails: Array<string>, exchangeMap: IExchangeRate) {
    const responses: Record<string, string[]> = {
      resolved: [],
      rejected: [],
    };

    try {
      await Promise.all(
        emails.map(async (email: string) => {
          const data = await this.mailService.sendExchangeRateEmail(
            email,
            exchangeMap,
          );

          if (!data) {
            responses.rejected.push(email);
          } else {
            responses.resolved.push(email);
          }
        }),
      );

      return responses;
    } catch (error) {
      this.logger.error(
        `Error occurred while sending emails: ${error.message}`,
      );
      return null;
    }
  }
}
