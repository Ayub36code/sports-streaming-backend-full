import { Injectable, UnauthorizedException, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'crypto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}
  private hashToken(token: string) { return createHash('sha256').update(token).digest('hex'); }

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } });
    if (exists) throw new ConflictException('Email already registered');
    const rounds = parseInt(this.config.get('BCRYPT_ROUNDS') || '12', 10);
    const passwordHash = await bcrypt.hash(dto.password, rounds);
    const verificationToken = uuidv4();
    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        displayName: dto.firstName ? `${dto.firstName} ${dto.lastName || ''}`.trim() : dto.email.split('@')[0],
        countryCode: dto.countryCode?.toUpperCase(),
        emailVerificationToken: verificationToken,
      },
      select: { id: true, email: true, role: true, displayName: true, countryCode: true, emailVerified: true },
    });
    this.logger.log(`Registered ${user.email} verification token ${verificationToken}`);
    return { user, verificationToken };
  }

  async login(dto: LoginDto, meta: { ip?: string; userAgent?: string; deviceInfo?: string }) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } });
    if (!user || !user.isActive || user.isBlocked) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    const activeSessions = await this.prisma.userSession.count({ where: { userId: user.id, isRevoked: false, expiresAt: { gt: new Date() } } });
    if (activeSessions >= 5) {
      const oldest = await this.prisma.userSession.findFirst({ where: { userId: user.id, isRevoked: false }, orderBy: { createdAt: 'asc' } });
      if (oldest) await this.prisma.userSession.update({ where: { id: oldest.id }, data: { isRevoked: true } });
    }
    const sessionId = uuidv4();
    const familyId = uuidv4();
    const accessPayload = { sub: user.id, email: user.email, role: user.role, sid: sessionId };
    const accessToken = this.jwt.sign(accessPayload, {
      secret: this.config.get('JWT_ACCESS_SECRET') || this.config.get('jwt.accessSecret'),
      expiresIn: this.config.get('JWT_ACCESS_EXPIRES_IN') || '15m',
    });
    const refreshToken = this.jwt.sign({ sub: user.id, family: familyId }, {
      secret: this.config.get('JWT_REFRESH_SECRET') || this.config.get('jwt.refreshSecret'),
      expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN') || '7d',
    });
    const hashed = this.hashToken(refreshToken);
    await this.prisma.refreshToken.create({
      data: { userId: user.id, tokenHash: hashed, familyId, expiresAt: new Date(Date.now() + 7*24*60*60*1000) },
    });
    await this.prisma.userSession.create({
      data: { id: sessionId, userId: user.id, ipAddress: meta.ip, userAgent: meta.userAgent, deviceInfo: meta.deviceInfo, expiresAt: new Date(Date.now() + 7*24*60*60*1000) },
    });
    await this.prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
    return { accessToken, refreshToken, user: { id: user.id, email: user.email, role: user.role, displayName: user.displayName } };
  }

  async refresh(oldRefreshToken: string) {
    const hashed = this.hashToken(oldRefreshToken);
    const stored = await this.prisma.refreshToken.findUnique({ where: { tokenHash: hashed } });
    if (!stored || stored.isRevoked || stored.expiresAt < new Date()) throw new UnauthorizedException('Invalid refresh token');
    await this.prisma.refreshToken.update({ where: { id: stored.id }, data: { isRevoked: true } });
    const user = await this.prisma.user.findUnique({ where: { id: stored.userId } });
    if (!user) throw new UnauthorizedException('User not found');
    const sessionId = uuidv4();
    const accessToken = this.jwt.sign({ sub: user.id, email: user.email, role: user.role, sid: sessionId }, {
      secret: this.config.get('JWT_ACCESS_SECRET'),
      expiresIn: this.config.get('JWT_ACCESS_EXPIRES_IN') || '15m',
    });
    const newRefresh = this.jwt.sign({ sub: user.id, family: stored.familyId }, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN') || '7d',
    });
    await this.prisma.refreshToken.create({
      data: { userId: user.id, tokenHash: this.hashToken(newRefresh), familyId: stored.familyId, expiresAt: new Date(Date.now() + 7*24*60*60*1000) },
    });
    await this.prisma.userSession.create({ data: { id: sessionId, userId: user.id, expiresAt: new Date(Date.now() + 7*24*60*60*1000) } });
    return { accessToken, refreshToken: newRefresh };
  }

  async logout(userId: string, sessionId?: string, allDevices = false) {
    if (allDevices) {
      await this.prisma.refreshToken.updateMany({ where: { userId, isRevoked: false }, data: { isRevoked: true } });
      await this.prisma.userSession.updateMany({ where: { userId, isRevoked: false }, data: { isRevoked: true } });
    } else if (sessionId) {
      await this.prisma.userSession.updateMany({ where: { id: sessionId }, data: { isRevoked: true } });
    }
    return { success: true };
  }

  async verifyEmail(token: string) {
    const user = await this.prisma.user.findFirst({ where: { emailVerificationToken: token } });
    if (!user) throw new BadRequestException('Invalid token');
    await this.prisma.user.update({ where: { id: user.id }, data: { emailVerified: true, emailVerificationToken: null } });
    return { verified: true };
  }
}
