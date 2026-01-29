import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import AppDataSource from './app.datasource';

@Module({
  imports: [
    // .env読み込み用
    ConfigModule.forRoot({ isGlobal: true }),

    // NOTE: アプリケーションへの登録
    TypeOrmModule.forRoot(AppDataSource.options),
    UserModule,
    PostModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
