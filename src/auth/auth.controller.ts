import { Controller, Post, Body, Req, UseGuards, Get, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private auth: AuthService) {}
  @Public() @Post('register') register(@Body() dto: RegisterDto) { return this.auth.register(dto); }
  @Public() @Post('login') login(@Body() dto: LoginDto, @Req() req: any) { return this.auth.login(dto, { ip: req.ip, userAgent: req.headers['user-agent'] }); }
  @Public() @Post('refresh') refresh(@Body() dto: RefreshDto) { return this.auth.refresh(dto.refreshToken); }
  @ApiBearerAuth('access-token') @UseGuards(JwtAuthGuard) @Post('logout') logout(@CurrentUser() user: any, @Body() body: { allDevices?: boolean }) { return this.auth.logout(user.id, user.sessionId, body?.allDevices); }
  @Public() @Get('verify-email') verifyEmail(@Query('token') token: string) { return this.auth.verifyEmail(token); }
}
