import { Module } from '@nestjs/common';
import { ErmesController } from './ermes.controller';
import { ErmesService } from './ermes.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { SlackModule } from 'nestjs-slack';
import { TelegramModule } from 'nestjs-telegram';

@Module({
  imports: [
    SlackModule.forRoot({
      type: 'webhook',
      url: process.env.SLACK_WEBHOOK,
    }),
    // TelegramModule.forRoot({
    //   botKey: process.env.TELEGRAM_TOKEN,
    // }),
    MailerModule.forRoot({
      transport: {
        // service: 'gmail',
        host: 'smtp.ethereal.email',
        port: 587,
        // secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
    }),
  ],
  controllers: [ErmesController],
  providers: [ErmesService],
})
export class ErmesModule {}
