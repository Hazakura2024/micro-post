import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { EditNameDto } from 'src/dto/edit-name.dto';
import type { Express } from 'express';

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

  @Get(':id')
  async getUser(@Param('id') id: number, @Query('token') token: string) {
    return await this.userService.getUser(token, id);
  }

  @Patch('me')
  async editUser(
    @Query('token') token: string,
    @Body() editNameDto: EditNameDto,
  ) {
    return await this.userService.editName(token, editNameDto.name);
  }

  @Patch('me/icon')
  uploadIcon(
    @Query('token') token: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('画像ファイルを読み込めません')
    }
    return this.userService.uploadImage(token, file);
  }
}
