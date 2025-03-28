"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
const cors = require("cors");
const server = express();
const allowedOrigins = [
    'https://gdsc-membership-front.vercel.app',
    'http://localhost:3000',
];
server.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
let appInitialized = false;
async function bootstrap() {
    if (!appInitialized) {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
        app.use(express.json());
        app.enableCors({
            origin: allowedOrigins,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        });
        await app.init();
        appInitialized = true;
        console.log('✅ NestJS App Initialized');
    }
}
exports.default = async (req, res) => {
    try {
        await bootstrap();
        server(req, res);
    }
    catch (error) {
        console.error('🚨 Server error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
//# sourceMappingURL=server.js.map