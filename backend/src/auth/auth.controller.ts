import { Body, Controller, Delete, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request, Response } from 'express';
import { JwtUser } from './types/jwt-user.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  // (学習メモ):  URLのクエリパラメタは@Query()デコレータで取り出せる
  async getAuth(
    @Body('user_id') name: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.getAuth(name, password);

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return {
      user_id: tokens.user_id,
      token: tokens.access_token,
    };
  }

  @Post('refresh')
  async refreshAuth(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refresh_token = req.cookies['refresh_token'] as string;

    const tokens = await this.authService.refreshAuth(refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return {
      userid: tokens.user_id,
      token: tokens.access_token,
    };
  }

  @Delete('logout')
  async logout(@Req() req: Request) {
    const user = req.user as JwtUser;
    return await this.authService.logout(user);
  }
}
