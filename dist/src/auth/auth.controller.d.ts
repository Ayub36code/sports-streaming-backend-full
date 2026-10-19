import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
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
    login(dto: LoginDto, req: any): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            displayName: string;
        };
    }>;
    refresh(dto: RefreshDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(user: any, body: {
        allDevices?: boolean;
    }): Promise<{
        success: boolean;
    }>;
    verifyEmail(token: string): Promise<{
        verified: boolean;
    }>;
}
