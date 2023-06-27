import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("api")
  @ApiTags("Inicial")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Api de boas vindas" })
  @ApiResponse({
    status: 200,
    description: "Dá boas vindas para teste.",
  })
  helloWorld() {
    return this.appService.getHello();
  }
}
