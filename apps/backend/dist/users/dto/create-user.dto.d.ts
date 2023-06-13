import { Role } from '../entities/role.enum';
export declare class CreateSpecialUserDto {
    readonly name: string;
    readonly cnpj: string;
    readonly email: string;
    readonly password: string;
    readonly roles: Role;
}
declare const CreateUserDto_base: import("@nestjs/common").Type<Omit<CreateSpecialUserDto, "roles">>;
export declare class CreateUserDto extends CreateUserDto_base {
}
export {};
