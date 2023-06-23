"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dist_1 = require("@nestjs/swagger/dist");
const dotenv_1 = require("dotenv");
const unauthorized_interceptor_1 = require("./common/errors/interceptors/unauthorized.interceptor");
const notfound_interceptor_1 = require("./common/errors/interceptors/notfound.interceptor");
const database_interceptor_1 = require("./common/errors/interceptors/database.interceptor");
(0, dotenv_1.config)({
    path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env",
});
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Api backend do Engenharia de concursos")
        .setDescription("Api para backend")
        .setVersion("1.0")
        .addServer("api")
        .addBearerAuth({
        description: `Insira seu token aqui. Não precisa de Bearer.`,
        name: "Authorization",
        bearerFormat: "Bearer",
        scheme: "Bearer",
        type: "http",
        in: "Header",
    }, "jwt")
        .build();
    const document = dist_1.SwaggerModule.createDocument(app, config);
    dist_1.SwaggerModule.setup("api-docs", app, document);
    app
        .useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }))
        .enableCors();
    app.useGlobalInterceptors(new unauthorized_interceptor_1.UnauthorizedInterceptor());
    app.useGlobalInterceptors(new notfound_interceptor_1.NotFoundInterceptor());
    app.useGlobalInterceptors(new database_interceptor_1.DatabaseInterceptor());
    app.setGlobalPrefix("api");
    await app.listen(process.env.APP_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map