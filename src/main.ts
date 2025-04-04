import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.enableCors({
    origin: 'http://localhost:3000', // フロントエンドのURL
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // 認証情報が必要ならtrue
  });
  await app.listen(3001);
  console.log(`Local Application is running on: http://localhost:3001`);
}

bootstrap();
