import {
  Controller,
  UseGuards,
  Post,
  Get,
  HttpStatus,
  Headers,
} from "@nestjs/common";
import { Body, HttpCode, Req } from "@nestjs/common/decorators";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { SigninDTO } from "../users/dto/signin.dto";
import { User } from "../users/entities/user.entity";
import {
  ApiOperation,
  ApiBearerAuth,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ReqHeaders } from "./models/req-headers.model";
import {
  SessionReponseOk,
  SessionResponseInvalid,
} from "./swagger/auth-session.swagger";

interface ReqLocal extends Request {
  user: User;
}

class LoginResponse {
  @ApiProperty()
  token: string;
}

@Controller("api/auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Responsável por emitir o token para logar nas api.",
  })
  @ApiResponse({
    status: 200,
    description: "Login realizado com sucesso",
    type: LoginResponse,
  })
  async login(
    @Body() signinDTO: SigninDTO,
    @Req() req: ReqLocal
  ): Promise<object> {
    
    return await this.authService.login(req.user);
  }

  @Get("session")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("jwt")
  @ApiOperation({
    summary: "Responsável por validar os tokens para o frontend.",
  })
  @ApiResponse({
    status: 200,
    description: "Token conferido com sucesso",
    type: SessionReponseOk,
  })
  @ApiResponse({
    status: 400,
    description: "Token inválido",
    type: SessionResponseInvalid,
  })
  async session(@Headers() headers: ReqHeaders): Promise<object> {
    return await this.authService.validateAccessToken(headers);
  }
}
