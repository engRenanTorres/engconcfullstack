//import 'dotenv/config';
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder } from "@nestjs/swagger";
import { SwaggerModule } from "@nestjs/swagger/dist";
import { config } from "dotenv";
import { UnauthorizedInterceptor } from "./common/errors/interceptors/unauthorized.interceptor";
import { NotFoundInterceptor } from "./common/errors/interceptors/notfound.interceptor";
import { DatabaseInterceptor } from "./common/errors/interceptors/database.interceptor";
//import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';

config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env",
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Api backend do Engenharia de concursos")
    .setDescription("Api para backend")
    .setVersion("1.0")
    //.addServer("api")
    .addBearerAuth(
      {
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `Insira seu token aqui. Não precisa de Bearer.`,
        name: "Authorization",
        bearerFormat: "Bearer", // I`ve tested not to use this field, but the result was the same
        scheme: "Bearer",
        type: "http", // I`ve attempted type: 'apiKey' too
        in: "Header",
      },
      "jwt" // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);

  app
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
    )
    .enableCors(); //whitelist garante que a api só recebera os parametros selecionados(parâmetros do objeto DTO)
  //forbidNonWhitelisted emite um erro se for enviador parâmetros a mais do que o esperado.
  //transform tipa o objeto diretamento com o seu dto
  //app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());
  //app.setGlobalPrefix("api");
  await app.listen(process.env.APP_PORT);
}
bootstrap();
