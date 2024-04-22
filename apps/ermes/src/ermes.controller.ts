import { Controller, Get, Logger } from '@nestjs/common';
import { ErmesService } from './ermes.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class ErmesController {
  constructor(private readonly ermesService: ErmesService) {}

  @EventPattern('send_email')
  async send_email({ email, id }) {
    this.ermesService.send_email(email, id);
  }

  @EventPattern('send_slack')
  async send_slack({ email, id }) {
    this.ermesService.send_slack(email, id);
  }

  @EventPattern('send_all')
  async send_all({ email, id }) {
    this.ermesService.send_email(email, id);
    this.ermesService.send_slack(email, id);
  }
}
