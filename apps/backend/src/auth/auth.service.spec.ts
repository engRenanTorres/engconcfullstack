import { JwtService } from "@nestjs/jwt";
import { Role } from "../users/entities/role.enum";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { AuthService } from "./auth.service";
import { NotFoundException } from "@nestjs/common";
import { TokenPayload } from "./models/jwt-payload.model";
import { ReqHeaders } from "./models/req-headers.model";

describe("AuthService", () => {
  let userService: UsersService;
  let authService: AuthService;
  let jwtService: JwtService;
  let normalUser: User;

  beforeEach(async () => {
    userService = new UsersService();
    jwtService = new JwtService();
    authService = new AuthService(userService, jwtService);
  });

  beforeAll(() => {
    normalUser = {
      id: 1,
      name: "Usuario Teste",
      email: "usuario@teste.com",
      password: "S3nh@Dificil",
      roles: Role.ADM,
    } as User;
  });

  describe("login", () => {
    it("should return a token when calls login", async () => {
      const token = "Iam a encrypted token";
      jest.spyOn(jwtService, "sign").mockImplementation(() => token);

      expect(await authService.login(normalUser)).toStrictEqual({ token });
      expect(jwtService.sign).toHaveBeenCalledWith(
        { sub: normalUser.id, email: normalUser.email, role: normalUser.roles },
        {}
      );
    });
  });
  describe("validateUser", () => {
    it("should return the user if the email and password are valid", async () => {
      const email = normalUser.email;
      const password = normalUser.password;
      jest
        .spyOn(userService, "findByEmailForLogin")
        .mockImplementation(() => Promise.resolve(normalUser));
      jest.spyOn(bcrypt, "compareSync").mockImplementation(() => true);

      expect(await authService.validateUser(email, password)).toStrictEqual(
        normalUser
      );
      expect(userService.findByEmailForLogin).toHaveBeenCalledWith(normalUser.email);
      expect(bcrypt.compareSync).toHaveBeenCalledWith(
        password,
        normalUser.password
      );
    });
    it("should return null if the email don`t exist in bd", async () => {
      const email = normalUser.email;
      const password = normalUser.password;
      const mockUserRepository = {
        findOneBy: () => jest.fn().mockReturnValue(Promise.resolve(null)),
      };
      //@ts-expect-error defined part of methods
      userService["usersRepository"] = mockUserRepository;
      jest
        .spyOn(userService, "findByEmailForLogin")
        .mockRejectedValue(() => new NotFoundException("bd error"));
      jest.spyOn(bcrypt, "compareSync").mockImplementation(() => false);

      expect(await authService.validateUser(email, password)).toBeNull();
      expect(userService.findByEmailForLogin).toHaveBeenCalledWith(normalUser.email);
    });
    it("should return null if the password is wrong", async () => {
      const email = normalUser.email;
      const password = "wrongPassword";
      const mockUserRepository = {
        findOneBy: () => jest.fn().mockReturnValue(Promise.resolve(null)),
      };
      //@ts-expect-error defined part of methods
      userService["usersRepository"] = mockUserRepository;
      jest
        .spyOn(userService, "findByEmailForLogin")
        .mockImplementation(() => Promise.resolve(normalUser));
      jest.spyOn(bcrypt, "compareSync").mockImplementation(() => false);

      expect(await authService.validateUser(email, password)).toBeNull();
      expect(userService.findByEmailForLogin).toHaveBeenCalledWith(normalUser.email);
      expect(bcrypt.compareSync).toHaveBeenCalledWith(
        password,
        normalUser.password
      );
    });
  });
  describe("validateAccessToken", () => {
    it.skip("should return a valid session", async () => {
      const headers = { authorization: "1234567token" } as ReqHeaders;
      const payload: TokenPayload = { sub: String(normalUser.id), role: 1 };
      const sessionResponseDTO = {
        valid: true,
        credencials: {
          id: normalUser.id,
          name: normalUser.name,
          email: normalUser.email,
          roles: normalUser.roles,
        },
      };
      jest.spyOn(jwtService, "verify").mockImplementation(() => payload);
      jest.spyOn(jwtService, "decode").mockImplementation(() => payload);
      jest
        .spyOn(userService, "findById")
        .mockImplementation(() => Promise.resolve(normalUser));

      expect(await authService.validateAccessToken(headers)).toStrictEqual(
        sessionResponseDTO
      );
      expect(userService.findById).toHaveBeenCalledWith(String(normalUser.id));
      expect(jwtService.decode).toHaveBeenCalledWith("token");
    });
  });
});
