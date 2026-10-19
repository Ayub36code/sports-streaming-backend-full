import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
export declare class NotificationsProcessor extends WorkerHost {
    private logger;
    process(job: Job): Promise<{
        delivered: boolean;
    }>;
}
