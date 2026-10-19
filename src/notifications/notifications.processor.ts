import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
@Processor('notifications')
export class NotificationsProcessor extends WorkerHost {
  private logger = new Logger(NotificationsProcessor.name);
  async process(job: Job) {
    this.logger.log(`Processing ${job.name} ${job.id} data=${JSON.stringify(job.data)}`);
    return { delivered: true };
  }
}
