import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDTO } from 'src/dto/create-post.dto';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { JwtUser } from 'src/auth/types/jwt-user.type';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createPost(@Body() createPostDto: CreatePostDTO, @Req() req: Request) {
    const user = req.user as JwtUser;
    return await this.postService.createPost(createPostDto.message, user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getList(
    @Req() req: Request,
    @Query('start') start: number,
    @Query('records') records: number,
    @Query('word') word?: string,
    @Query('user_name') user_name?: string,
  ) {
    return await this.postService.getList(start, records, word, user_name);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deletePost(@Param('id') id: number, @Req() req: Request) {
    const user = req.user as JwtUser;
    return await this.postService.deletePost(id, user);
  }
}
