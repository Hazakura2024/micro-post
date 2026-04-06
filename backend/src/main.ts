import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  // NOTE: CORS（Cross-Origin Resource Sharing:違うオリジンからのアクセス）を有効にする
  const frontendOrigin = process.env.FRONTEND_URL?.replace(/\/$/, '');

  app.enableCors({
    origin: frontendOrigin
      ? [frontendOrigin, 'http://localhost:3001', 'http://127.0.0.1:3001']
      : ['http://localhost:3001', 'http://127.0.0.1:3001'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // (学習メモ): これをtrueにしないとcookieが弾かれる
  });

  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
