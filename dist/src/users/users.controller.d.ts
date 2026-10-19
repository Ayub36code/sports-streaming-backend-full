import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private users;
    constructor(users: UsersService);
    me(user: any): Promise<{
        id: string;
        email: string;
        emailVerified: boolean;
        firstName: string;
        lastName: string;
        displayName: string;
        avatarUrl: string;
        role: import(".prisma/client").$Enums.UserRole;
        countryCode: string;
        language: string;
        timezone: string;
        createdAt: Date;
    }>;
    updateMe(user: any, dto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        displayName: string;
        countryCode: string;
        language: string;
        timezone: string;
    }>;
    list(page?: number, limit?: number): Promise<{
        items: {
            id: string;
            email: string;
            emailVerified: boolean;
            emailVerificationToken: string | null;
            passwordHash: string;
            firstName: string | null;
            lastName: string | null;
            displayName: string | null;
            avatarUrl: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            countryCode: string | null;
            language: string;
            timezone: string;
            isActive: boolean;
            isBlocked: boolean;
            twoFactorEnabled: boolean;
            twoFactorSecret: string | null;
            lastLoginAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
}
