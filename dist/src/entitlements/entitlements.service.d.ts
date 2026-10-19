import { PrismaService } from '../prisma/prisma.service';
import { RightsService } from '../rights-management/rights.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class EntitlementsService {
    private prisma;
    private rights;
    private config;
    private jwt;
    private logger;
    constructor(prisma: PrismaService, rights: RightsService, config: ConfigService, jwt: JwtService);
    authorize(user: any, dto: {
        eventId?: string;
        videoAssetId?: string;
        countryCode: string;
        deviceId?: string;
    }): Promise<{
        playbackToken: string;
        hlsUrl: string;
        dashUrl: string;
        expiresIn: number;
        jti: string;
    }>;
    heartbeat(jti: string): Promise<{
        ok: boolean;
    }>;
    stop(jti: string): Promise<{
        stopped: boolean;
    }>;
}
