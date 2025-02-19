import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://gdsc-membership-front.vercel.app', // フロントエンドのURL
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // 認証情報が必要ならtrue
  });
  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000`);
}

bootstrap();
