import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as cors from 'cors';

// Express インスタンスを作成
const server = express();

// CORS 設定（VercelでCORSエラーを防ぐ）
server.use(
  cors({
    origin: 'https://gdsc-membership-front.vercel.app', // フロントエンドのURL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

let appInitialized = false; // アプリが初期化されたかを追跡

async function bootstrap() {
  if (!appInitialized) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.use(express.json());
    app.enableCors({
      // NestJS 側でも CORS を有効化
      origin: 'https://gdsc-membership-front.vercel.app',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    await app.init();
    appInitialized = true;
    console.log('✅ NestJS App Initialized');
  }
}

// Vercel 用にエクスポート
export default async (req: express.Request, res: express.Response) => {
  try {
    await bootstrap();
    server(req, res);
  } catch (error) {
    console.error('🚨 Server error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
