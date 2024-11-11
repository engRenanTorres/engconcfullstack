import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Role } from "./entities/role.enum";
import { UpdateUserDto } from "./dto/update-user.dto/update-user.dto";
import { NotFoundException } from "@nestjs/common";
import { DataBaseError } from "../common/errors/types/DatabaseError";

describe("UsersService", () => {
  let service: UsersService;
  let id: number;
  let expectOutputUser: CreateUserDto;
  let createUserDTO: CreateUserDto;

  beforeEach(async () => {
    service = new UsersService();
    id = 1;
  });

  beforeAll(() => {
    expectOutputUser = {
      name: "Usuario Teste",
      cnpj: "12345678912",
      email: "usuario@teste.com",
      password: "S3nh@Dificil",
    };

    createUserDTO = {
      name: "Usuario Teste",
      cnpj: "12345678912",
      email: "usuario@teste.com",
      password: "S3nh@Dificil",
    };
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create method", () => {
    it("should create a user", async () => {
      const mockUserRepository = {
        create: () => jest.fn().mockReturnValue(Promise.resolve(createUserDTO)),
        save: jest.fn().mockReturnValue(Promise.resolve(createUserDTO)),
      };
      //@ts-expect-error defined part of methods
      service["usersRepository"] = mockUserRepository;
      const newUser = await service.create(createUserDTO);

      expect(mockUserRepository.save).toHaveBeenCalled();
      expect(newUser).toMatchObject(expectOutputUser);
    });
    it.skip("should throw a database error if there is an error saving the user", async () => {
      const mockUserRepository = {
        create: (createUserDTO: CreateUserDto) =>
          jest.fn().mockReturnValue(createUserDTO),
        save: jest.fn().mockRejectedValue(new DataBaseError("erro", "254")),
      };
      //@ts-expect-error defined part of methods
      service["usersRepository"] = mockUserRepository;
      await expect(service.create(createUserDTO)).rejects.toThrow(
        DataBaseError
      );
    });
  });
  describe("Updating user", () => {
    it("should call save user after update", async () => {
      const updateeUserDTO: UpdateUserDto = {
        name: "Usuario Teste",
        cnpj: "12345678912",
        email: "usuario@teste.com",
        password: "S3nh@Dificil",
      };
      //mocks
      const mockUserRepository = {
        update: () =>
          jest.fn().mockReturnValue(Promise.resolve(updateeUserDTO)),
        preload: jest.fn().mockReturnValue(Promise.resolve(updateeUserDTO)),
        findOneBy: jest.fn().mockReturnValue(Promise.resolve(updateeUserDTO)),
        save: jest.fn().mockReturnValue(Promise.resolve(updateeUserDTO)),
      };
      //Action
      //@ts-expect-error defined part of methods
      service["usersRepository"] = mockUserRepository;
      const user = await service.update("1", updateeUserDTO);
      // Output
      expect(mockUserRepository.save).toHaveBeenCalled();
      expect(user).toMatchObject(expectOutputUser);
    });

    it("should throw a notFoundExeption when dont exists user with the selected id", async () => {
      const updateeUserDTO: UpdateUserDto = {
        name: "Usuario Teste",
        cnpj: "12345678912",
        email: "usuario@teste.com",
        password: "S3nh@Dificil",
      };
      const mockUserRepository = {
        update: jest.fn().mockReturnValue(Promise.resolve(null)),
        preload: jest.fn().mockReturnValue(Promise.resolve(null)),
        findOneBy: jest.fn().mockReturnValue(Promise.resolve(null)),
        save: jest.fn().mockReturnValue(Promise.resolve(null)),
      };
      //@ts-expect-error defined part of methods
      service["usersRepository"] = mockUserRepository;

      async function update() {
        await service.update(`${id}`, updateeUserDTO);
      }

      await expect(update()).rejects.toThrow();
      expect(mockUserRepository.preload).toHaveBeenCalled();
      expect(mockUserRepository.save).not.toHaveBeenCalled();
    });
  });

  describe("Finding users", () => {
    it("should list all users", async () => {
      const expectOutputUsers = [
        {
          name: "Usuario Teste",
          matricula: "123",
          email: "usuario@teste.com",
          password: "S3nh@Dificil",
          roles: Role.ADM,
        },
      ];
      const mockUserRepository = {
        findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
        find: jest.fn().mockReturnValue(Promise.resolve(expectOutputUsers)),
      };
      //@ts-expect-error defined part of methods
      service["usersRepository"] = mockUserRepository;
      const users = await service.findAll();
      expect(mockUserRepository.find).toHaveBeenCalled();
      expect(expectOutputUsers).toStrictEqual(users);
    });
    it("should get one user when fetching by id", async () => {
      const id = 1;
      const expectOutputUser = [
        {
          id: 1,
          name: "Usuario Teste",
          matricula: "123",
          email: "usuario@teste.com",
          password: "S3nh@Dificil",
          roles: Role.ADM,
        },
      ];
      const mockUserRepository = {
        findById: jest.fn().mockReturnValue(Promise.resolve(expectOutputUser)),
        findOneBy: jest.fn().mockReturnValue(Promise.resolve(expectOutputUser)),
      };
      //@ts-expect-error defined part of methods
      service["usersRepository"] = mockUserRepository;
      const user = await service.findById(id);
      expect(mockUserRepository.findOneBy).toHaveBeenCalled();
      expect(expectOutputUser).toStrictEqual(user);
    });
    it("should throw a notFoundExeption when trying to find a user by id that not exists", async () => {
      const id = 1;

      const mockUserRepository = {
        findById: jest.fn().mockReturnValue(Promise.resolve(null)),
        findOneBy: jest.fn().mockReturnValue(Promise.resolve(null)),
      };
      //@ts-expect-error defined part of methods
      service["usersRepository"] = mockUserRepository;

      async function findbyId() {
        await service.findById(id);
      }

      await expect(findbyId()).rejects.toThrow(NotFoundException);
      expect(mockUserRepository.findOneBy).toHaveBeenCalled();
    });
  });

  describe("Removing users", () => {
    it("should remove one user", async () => {
      const email = "usuario@teste.com";
      const expectOutputUser = [
        {
          id: 1,
          name: "Usuario Teste",
          matricula: "123",
          email: "usuario@teste.com",
          password: "S3nh@Dificil",
          roles: Role.ADM,
        },
      ];
      const mockUserRepository = {
        findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputUser)),
        remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputUser)),
      };
      //@ts-expect-error defined part of methods
      service["usersRepository"] = mockUserRepository;
      const user = await service.remove(email);
      expect(mockUserRepository.remove).toHaveBeenCalled();
      expect(expectOutputUser).toStrictEqual(user);
    });
    it("should throw a notFoundExeption when trying to remove a user that not exists", async () => {
      const email = "myemail";

      const mockUserRepository = {
        findOne: jest.fn().mockReturnValue(Promise.resolve(null)),
        remove: jest.fn().mockReturnValue(Promise.resolve(null)),
      };
      //@ts-expect-error defined part of methods
      service["usersRepository"] = mockUserRepository;

      async function removeById() {
        await service.remove(email);
      }

      await expect(removeById()).rejects.toThrow(NotFoundException);
      expect(mockUserRepository.remove).not.toHaveBeenCalled();
    });
  });
});
