import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MicroPost } from 'src/entities/micropost';
import { Auth } from 'src/entities/auth';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([MicroPost, Auth]), AuthModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule { }
