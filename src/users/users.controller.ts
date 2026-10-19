import { Controller, Get, Patch, Body, UseGuards, Query, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
@ApiTags('Users')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private users: UsersService) {}
  @Get('me') me(@CurrentUser() user: any) { return this.users.findById(user.id); }
  @Patch('me') updateMe(@CurrentUser() user: any, @Body() dto: UpdateUserDto) { return this.users.update(user.id, dto); }
  @Roles('ADMIN','SUPER_ADMIN') @Get() list(@Query('page') page = 1, @Query('limit') limit = 20) { return this.users.list(Number(page), Number(limit)); }
  @Roles('SUPER_ADMIN') @Delete(':id') delete(@Param('id') id: string) { return this.users.deleteUser(id); }
}
