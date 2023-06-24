import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { compareSync } from "bcrypt";
import { User } from "../users/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { TokenPayload } from "./models/jwt-payload.model";
import { ReqHeaders } from "./models/req-headers.model";
import extractAuthUser from "../helpers/get-auth-user.helper";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(user: User): Promise<{ token: string }> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.roles,
    };

    return {
      token: this.jwtService.sign(payload, {}),
    };
  }

  async validateUser(email: string, password: string) {
    let user: User;
    try {
      user = await this.userService.findByEmailForLogin(email);
    } catch (error) {
      return null;
    }
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;
    return user;
  }

  async validateAccessToken(headers: ReqHeaders) {
    /*const authHeader = headers.authorization;
    const accessToken = authHeader.slice(7);
    try {
      await this.jwtService.verify(accessToken, {
        publicKey: process.env.TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException(
        "The Authorization Token is not Valid: " + error.message
      );
    }
    const decodedToken = this.jwtService.decode(accessToken) as TokenPayload;

    let user: User;
    try {
      user = await this.userService.findById(+decodedToken.sub);
    } catch (error) {
      return new UnauthorizedException("Usuário inexistente: " + error.message);
    }*/
    const user = await extractAuthUser(headers.authorization, this.userService);
    const sessionResponseDTO = {
      valid: true,
      credencials: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
    };
    return sessionResponseDTO;
  }
}
