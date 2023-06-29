import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { Role } from "./entities/role.enum";
import { User } from "./entities/user.entity";

describe("UsersController", () => {
  let service: UsersService;
  let controller: UsersController;
  let normalUser: User;

  beforeEach(async () => {
    service = new UsersService();
    controller = new UsersController(service);
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

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should return an array of users", async () => {
      jest
        .spyOn(service, "findAll")
        .mockImplementation(() => Promise.resolve([normalUser]));

      expect(await controller.findAll()).toStrictEqual([normalUser]);
    });
  });

  describe("findById", () => {
    it("should return a user", async () => {
      jest
        .spyOn(service, "findById")
        .mockImplementation(() => Promise.resolve(normalUser));

      expect(await controller.findById(normalUser.id)).toBe(normalUser);
    });
  });
  describe("create", () => {
    it("should return a user", async () => {
      jest
        .spyOn(service, "create")
        .mockImplementation(() => Promise.resolve(normalUser));

      expect(await controller.create(normalUser)).toBe(normalUser);
    });
  });
  describe("update", () => {
    it("should return a user", async () => {
      jest
        .spyOn(service, "update")
        .mockImplementation(() => Promise.resolve(normalUser));

      expect(await controller.update(String(normalUser.id), normalUser)).toBe(
        normalUser
      );
    });
  });
});
