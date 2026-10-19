import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    private readonly logger;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    private hashToken;
    register(dto: RegisterDto): Promise<{
        user: {
            id: string;
            email: string;
            emailVerified: boolean;
            displayName: string;
            role: import(".prisma/client").$Enums.UserRole;
            countryCode: string;
        };
        verificationToken: string;
    }>;
    login(dto: LoginDto, meta: {
        ip?: string;
        userAgent?: string;
        deviceInfo?: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            displayName: string;
        };
    }>;
    refresh(oldRefreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string, sessionId?: string, allDevices?: boolean): Promise<{
        success: boolean;
    }>;
    verifyEmail(token: string): Promise<{
        verified: boolean;
    }>;
}
