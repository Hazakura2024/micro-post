import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';

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
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      user_id: tokens.user_id,
      token: tokens.access_token,
    };
  }
}
