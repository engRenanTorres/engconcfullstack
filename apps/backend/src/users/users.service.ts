import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { CreateSpecialUserDto, CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto/update-user.dto";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common/exceptions";
import { Role } from "./entities/role.enum";
import { DataBaseError } from "../common/errors/types/DatabaseError";

@Injectable()
export class UsersService implements OnModuleInit {
  @Inject("USER_REPOSITORY")
  private readonly usersRepository: Repository<User>;

  private logger: Logger = new Logger("UserService");

  async onModuleInit(): Promise<void> {
    const users = await this.usersRepository.find();
    if (users.length === 0) {
      this.logger.log("adm user has been created");
      const adm: CreateSpecialUserDto = {
        name: "Adm",
        cnpj: "00000000000",
        email: "adm@adm.com",
        password: "IamAdm123",
        roles: Role.ADM,
      };
      const normal: CreateSpecialUserDto = {
        name: "Normal",
        cnpj: "00000000002",
        email: "normal@normal.com",
        password: "IamNormal123",
        roles: Role.USER,
      };
      await this.create(adm);
      await this.create(normal);
      return;
    }
    this.logger.log("Dont need to create adm. users.length = " + users.length);
    return;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: id });
    this.checkIfUserExiste(user, String(id));
    return user;
  }

  async findByEmailForLogin(email: string): Promise<User> | null {
    const query = this.usersRepository.createQueryBuilder('user');
    query.where({ email: email });
    query.addSelect('user.password'); // show the hidden column
    const user = await query.getOne();
    
    try {
      this.checkIfUserExiste(user, email);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
    return user;
  }

  async create(createUserDTO: CreateUserDto) {
    try {
      const user = this.usersRepository.create(createUserDTO); // Create apenas prepara o objeto sem salvar no bd
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new DataBaseError(error.message, error.code);
    }
  }

  async update(email: string, updateUserDTO: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ email: email });
    const userUpdated = await this.usersRepository.preload({
      id: user?.id,
      ...updateUserDTO,
    });
    this.checkIfUserExiste(user, String(user?.id));
    return await this.usersRepository.save(userUpdated);
  }

  async remove(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    this.checkIfUserExiste(user, String(user?.id));
    return await this.usersRepository.remove(user);
  }

  private checkIfUserExiste(user: object, id: string) {
    if (!user) {
      throw new NotFoundException(`User not found by id ${id}`);
    }
  }
}
