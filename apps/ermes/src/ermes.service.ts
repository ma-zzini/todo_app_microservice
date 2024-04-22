import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { SlackService } from 'nestjs-slack';
import { TelegramService } from 'nestjs-telegram';

@Injectable()
export class ErmesService {
  private readonly logger: Logger = new Logger(ErmesService.name);
  constructor(
    private emailService: MailerService,
    private slackService: SlackService,
    private telegramService: TelegramService,
  ) {}

  send_email(email: string, id: string) {
    this.emailService
      .sendMail({
        to: email,
        from: process.env.EMAIL_USER,
        subject: 'Welcome New User ✔',
        text: 'welcome',
        html: '<b>' + id + '</b>',
      })
      .then((info) => this.logger.debug(JSON.stringify(info)))
      .catch((err) => this.logger.debug(JSON.stringify(err)));
  }

  send_slack(email: string, id: string) {
    this.slackService.sendText('email: ' + email + '\nuserid: ' + id);
  }
}
