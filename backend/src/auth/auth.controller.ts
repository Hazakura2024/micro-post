import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  // (学習メモ):  URLのクエリパラメタは@Query()デコレータで取り出せる
  async getAuth(
    @Body('user_id') name: string,
    @Body('password') password: string,
  ) {
    return await this.authService.getAuth(name, password);
  }
}
