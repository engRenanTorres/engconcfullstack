import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SigninDTO } from "../users/dto/signin.dto";
import { ReqHeaders } from "./models/req-headers.model";

describe("AuthController", () => {
  let userService: UsersService;
  let authService: AuthService;
  let jwtService: JwtService;
  let controller: AuthController;

  beforeEach(async () => {
    userService = new UsersService();
    jwtService = new JwtService();
    authService = new AuthService(userService, jwtService);
    controller = new AuthController(authService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("login", () => {
    it("should return a valid token", async () => {
      interface ReqLocal extends Request {
        user: User;
      }
      const loginResponse = {
        token: "Iam a token",
      };
      const signinDTO = {} as SigninDTO;
      const req = {} as ReqLocal;
      jest
        .spyOn(authService, "login")
        .mockImplementation(() => Promise.resolve(loginResponse));

      expect(await controller.login(signinDTO, req)).toStrictEqual(
        loginResponse
      );
    });
  });
  describe("get session", () => {
    const sessionResponseDTO = {
      valid: true,
      credencials: {
        id: 1,
        name: "Usuario Teste",
        email: "usuario@teste.com",
        roles: 2,
      },
    };
    it("should return a valid session", async () => {
      const headers = {} as ReqHeaders;
      jest
        .spyOn(authService, "validateAccessToken")
        .mockImplementation(() => Promise.resolve(sessionResponseDTO));

      expect(await controller.session(headers)).toStrictEqual(
        sessionResponseDTO
      );
    });
  });
});
