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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const signin_dto_1 = require("../users/dto/signin.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_session_swagger_1 = require("./swagger/auth-session.swagger");
class LoginResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LoginResponse.prototype, "token", void 0);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(signinDTO, req) {
        return await this.authService.login(req.user);
    }
    async session(headers) {
        return await this.authService.validateAccessToken(headers);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, common_1.Post)('login'),
    (0, decorators_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Responsável por emitir o token para logar nas api.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Login realizado com sucesso',
        type: LoginResponse,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, decorators_1.Body)()),
    __param(1, (0, decorators_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_dto_1.SigninDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('session'),
    (0, decorators_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, swagger_1.ApiOperation)({
        summary: 'Responsável por validar os tokens para o frontend.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Token conferido com sucesso',
        type: auth_session_swagger_1.SessionReponseOk,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Token inválido',
        type: auth_session_swagger_1.SessionResponseInvalid,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "session", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map