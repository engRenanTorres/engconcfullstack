import { HttpException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto/update-user.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<Array<User>>;
    findById(id: string): Promise<User> | HttpException;
    create(body: CreateUserDto): Promise<User> | HttpException;
    update(email: string, body: UpdateUserDto): Promise<User> | HttpException;
    remove(email: string): Promise<User>;
}
