import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

// Express インスタンスを作成
const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();
}

// Vercel 用にエクスポート
export default async (req: express.Request, res: express.Response) => {
  await bootstrap();
  return server(req, res);
};
