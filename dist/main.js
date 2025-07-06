"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const Port = Number(process.env.PORT) || 3000;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(Port, () => {
        console.log(`Bot Server started on port ${Port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map