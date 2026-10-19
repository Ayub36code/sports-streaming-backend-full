import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true, email: true, role: true, displayName: true, firstName: true, lastName: true, countryCode: true, language: true, timezone: true, avatarUrl: true, emailVerified: true, createdAt: true } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  async update(id: string, dto: UpdateUserDto) { return this.prisma.user.update({ where: { id }, data: dto, select: { id: true, email: true, displayName: true, countryCode: true, language: true, timezone: true } }); }
  async list(page = 1, limit = 20) {
    const skip = (page-1)*limit;
    const [items, total] = await Promise.all([this.prisma.user.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }), this.prisma.user.count()]);
    return { items, total, page, limit };
  }
  async deleteUser(id: string) {
    await this.prisma.user.update({ where: { id }, data: { email: `deleted_${id}@deleted.local`, isActive: false, firstName: 'Deleted', lastName: 'User', displayName: 'Deleted User', avatarUrl: null } });
    await this.prisma.refreshToken.updateMany({ where: { userId: id }, data: { isRevoked: true } });
    await this.prisma.userSession.updateMany({ where: { userId: id }, data: { isRevoked: true } });
    return { deleted: true };
  }
}
