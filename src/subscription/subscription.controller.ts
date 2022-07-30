import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';
import e, { Response } from 'express';
import { HttpExceptionFilter } from 'src/common/filters';
import { SubscribeEmailDto } from './dto';
import { SubscriptionService } from './subscription.service';

@Controller()
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post('subscribe')
  @UseFilters(new HttpExceptionFilter())
  public async subscribeEmail(
    @Body() body: SubscribeEmailDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.subscriptionService.addNewEmail(body.email);

    if (!result) {
      throw new BadRequestException();
    }

    res.status(HttpStatus.OK);
  }

  @Post('sendEmails')
  @UseFilters(new HttpExceptionFilter())
  async sendEmails(@Res({ passthrough: true }) res: Response) {
    const result = await this.subscriptionService.sendEmails();
    console.log(result);
    if (result === null) {
      throw new BadRequestException();
    } else if (result.resolved.length === 0) {
      throw new BadRequestException();
    } else {
      res.status(HttpStatus.OK);
    }
  }
}
