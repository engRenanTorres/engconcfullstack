"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const get_auth_user_helper_1 = require("../helpers/get-auth-user.helper");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.roles,
        };
        return {
            token: this.jwtService.sign(payload, {}),
        };
    }
    async validateUser(email, password) {
        let user;
        try {
            user = await this.userService.findByEmailForLogin(email);
        }
        catch (error) {
            return null;
        }
        const isPasswordValid = (0, bcrypt_1.compareSync)(password, user.password);
        if (!isPasswordValid)
            return null;
        return user;
    }
    async validateAccessToken(headers) {
        const user = await (0, get_auth_user_helper_1.default)(headers.authorization, this.userService);
        const sessionResponseDTO = {
            valid: true,
            credencials: {
                id: user.id,
                name: user.name,
                email: user.email,
                roles: user.roles,
            },
        };
        return sessionResponseDTO;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map