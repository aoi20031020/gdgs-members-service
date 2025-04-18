"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,POST,PUT,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Authorization',
        credentials: true,
    });
    await app.listen(3001);
    console.log(`Local Application is running on: http://localhost:3001`);
}
bootstrap();
//# sourceMappingURL=main.js.map