import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDTO, PostQueryDto } from 'src/dto/create-post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createPost(
    @Body() createPostDto: CreatePostDTO,
    @Query() postQueryDto: PostQueryDto,
  ) {
    return await this.postService.createPost(
      createPostDto.message,
      postQueryDto.token,
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getList(
    @Query('token') token: string,
    @Query('start') start: number,
    @Query('records') records: number,
    @Query('word') word?: string,
    @Query('user_name') user_name?: string,
  ) {
    return await this.postService.getList(
      token,
      start,
      records,
      word,
      user_name,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deletePost(@Param('id') id: number, @Query('token') token: string) {
    return await this.postService.deletePost(id, token);
  }
}
