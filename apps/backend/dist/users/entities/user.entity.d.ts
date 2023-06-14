import { Role } from "./role.enum";
export declare class User {
    id: number;
    name: string;
    cnpj: string;
    email: string;
    password: string;
    roles: Role;
    constructor(user: Partial<User>);
    hasPassword(): void;
}
