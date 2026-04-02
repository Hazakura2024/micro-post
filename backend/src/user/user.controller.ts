import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { EditNameDto } from 'src/dto/edit-name.dto';
import type { Express, Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import type { JwtUser } from 'src/auth/types/jwt-user.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    );
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getUser(@Req() req: Request) {
    const user = req.user as JwtUser;
    return await this.userService.getUser(user);
  }

  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  async editUser(
    @Query('token') token: string,
    @Body() editNameDto: EditNameDto,
  ) {
    return await this.userService.editName(token, editNameDto.name);
  }

  @UseInterceptors(FileInterceptor('icon'))
  @Patch('me/icon')
  @UseGuards(AuthGuard('jwt'))
  uploadIcon(
    @Query('token') token: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('画像ファイルを読み込めません')
    }
    return this.userService.uploadImage(token, file);
  }

  @Get('me/icon')
  @UseGuards(AuthGuard('jwt'))
  async getIcon(@Query('token') token: string) {
    return this.userService.getIcon(token);
  }
}
