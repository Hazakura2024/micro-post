import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDTO, PostQueryDto } from 'src/dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
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
  async getList(
    @Query('token') token: string,
    @Query('start') start: number,
    @Query('records') records: number,
  ) {
    return await this.postService.getList(token, start, records);
  }
}
