import { OnModuleInit } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
export declare class UsersService implements OnModuleInit {
    private readonly usersRepository;
    private logger;
    onModuleInit(): Promise<void>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User> | null;
    create(createUserDTO: CreateUserDto): Promise<User>;
    update(email: string, updateUserDTO: UpdateUserDto): Promise<User>;
    remove(email: string): Promise<User>;
    private checkIfUserExiste;
}
