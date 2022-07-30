import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { IExchangeRate } from 'src/subscription/interfaces';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private mailerService: MailerService) {}

  async sendExchangeRateEmail(email: string, data: IExchangeRate) {
    const { sourceAmount, sourceCurrency, targetAmount, targetCurrency } = data;

    try {
      const data = await this.mailerService.sendMail({
        to: email,
        subject: 'Exchange Rate',
        template: join('./exchange-rate'),
        context: {
          sourceAmount,
          sourceCurrency,
          targetAmount,
          targetCurrency,
        },
      });
      return data ? data : null;
    } catch (error) {
      this.logger.error(`Error occurred while sending email: ${error.message}`);
    }
  }
}
