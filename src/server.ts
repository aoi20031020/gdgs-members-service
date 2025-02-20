import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as cors from 'cors';

// Express インスタンスを作成
const server = express();

// CORS 設定（ローカル & Vercel のフロントエンドを許可）
const allowedOrigins = [
  'https://gdsc-membership-front.vercel.app', // Vercelのフロントエンド
  'http://localhost:3000', // ローカル環境（React開発用）
];

server.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Cookie 認証を使う場合は true
  }),
);

let appInitialized = false; // アプリが初期化されたかを追跡

async function bootstrap() {
  if (!appInitialized) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.use(express.json());

    // NestJS 側でも CORS を有効化
    app.enableCors({
      origin: allowedOrigins,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true, // Cookie 認証を使う場合は true
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
