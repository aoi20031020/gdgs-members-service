"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
const server = express();
let appInitialized = false;
async function bootstrap() {
    if (!appInitialized) {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
        app.use(express.json());
        await app.init();
        appInitialized = true;
        console.log('-------app initialized-------');
    }
}
exports.default = async (req, res) => {
    await bootstrap();
    server(req, res);
};
//# sourceMappingURL=server.js.map