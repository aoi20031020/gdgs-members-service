import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

// Express インスタンスを作成
const server = express();

let appInitialized = false; // アプリが初期化されたかを追跡

async function bootstrap() {
  if (!appInitialized) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.use(express.json());
    await app.init();
    appInitialized = true;
    console.log('-------app initialized-------');
  }
}

// Vercel 用にエクスポート
export default async (req: express.Request, res: express.Response) => {
  await bootstrap(); // 一度だけ初期化
  server(req, res);
};
