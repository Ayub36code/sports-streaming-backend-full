import { EventStatus } from '@prisma/client';
export declare class CreateEventDto {
    slug: string;
    title: string;
    sportId: string;
    competitionId?: string;
    seasonId?: string;
    venueId?: string;
    scheduledAt: string;
    status?: EventStatus;
    metadata?: any;
}
