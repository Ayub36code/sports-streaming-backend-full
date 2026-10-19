import { EntitlementsService } from './entitlements.service';
export declare class EntitlementsController {
    private s;
    constructor(s: EntitlementsService);
    authorize(dto: any, user: any): Promise<{
        playbackToken: string;
        hlsUrl: string;
        dashUrl: string;
        expiresIn: number;
        jti: string;
    }>;
    heartbeat(dto: {
        jti: string;
    }): Promise<{
        ok: boolean;
    }>;
    stop(dto: {
        jti: string;
    }): Promise<{
        stopped: boolean;
    }>;
}
