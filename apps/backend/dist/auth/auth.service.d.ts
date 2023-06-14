import { UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User } from "../users/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { ReqHeaders } from "./models/req-headers.model";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(user: User): Promise<{
        token: string;
    }>;
    validateUser(email: string, password: string): Promise<User>;
    validateAccessToken(headers: ReqHeaders): Promise<UnauthorizedException | {
        valid: boolean;
        credencials: {
            id: number;
            name: string;
            email: string;
            roles: import("../users/entities/role.enum").Role;
        };
    }>;
}
