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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto/update-user.dto");
const decorators_1 = require("@nestjs/common/decorators");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../decorators/roles.decorator");
const role_enum_1 = require("./entities/role.enum");
const swagger_1 = require("@nestjs/swagger");
const swagger_messages_helper_1 = require("./swagger/swagger-messages.helper");
const index_users_swagger_1 = require("./swagger/index-users.swagger");
const message_helper_1 = require("../helpers/message.helper");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    findAll() {
        return this.usersService.findAll();
    }
    findById(id) {
        const user = this.usersService.findById(id);
        return user;
    }
    create(body) {
        return this.usersService.create(body);
    }
    update(email, body) {
        return this.usersService.update(email, body);
    }
    async remove(email) {
        return await this.usersService.remove(email);
    }
};
__decorate([
    (0, common_1.Get)("all"),
    (0, decorators_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADM, role_enum_1.Role.STAFF),
    (0, swagger_1.ApiForbiddenResponse)({ description: "Access denied." }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: swagger_messages_helper_1.UsersMsgSwagger.ALL_SUMMARY }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: swagger_messages_helper_1.UsersMsgSwagger.ALL_200,
        type: index_users_swagger_1.UserFindSwagger,
        isArray: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: message_helper_1.MessagesHelper.ACCESS_DENIED,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [require("./entities/user.entity").User] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, decorators_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, swagger_1.ApiForbiddenResponse)({ description: "Access denied." }),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADM, role_enum_1.Role.STAFF),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: swagger_messages_helper_1.UsersMsgSwagger.FIND_USER_SUMMARY }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: swagger_messages_helper_1.UsersMsgSwagger.FIND_USER_200,
        type: index_users_swagger_1.IndexUsersSwagger,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: message_helper_1.MessagesHelper.ACCESS_DENIED,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: swagger_messages_helper_1.UsersMsgSwagger.USER_NOT_FOUND,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: swagger_messages_helper_1.UsersMsgSwagger.CREATE_SUMMARY }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: swagger_messages_helper_1.UsersMsgSwagger.CREATE_200,
        type: index_users_swagger_1.IndexUsersSwagger,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: swagger_messages_helper_1.UsersMsgSwagger.CREATE_400,
        type: index_users_swagger_1.InvalidPasswordResponse,
    }),
    (0, swagger_1.ApiResponse)({ status: 409, description: swagger_messages_helper_1.UsersMsgSwagger.CREATE_409 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(":email"),
    (0, decorators_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, swagger_1.ApiForbiddenResponse)({ description: "Access denied." }),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADM),
    (0, swagger_1.ApiOperation)({ summary: swagger_messages_helper_1.UsersMsgSwagger.UPDATE_SUMMARY }),
    (0, swagger_1.ApiResponse)({ status: 200, description: swagger_messages_helper_1.UsersMsgSwagger.UPDATE_200 }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: swagger_messages_helper_1.UsersMsgSwagger.USER_NOT_FOUND,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: message_helper_1.MessagesHelper.ACCESS_DENIED,
    }),
    __param(0, (0, common_1.Param)("email")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":email"),
    (0, decorators_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    (0, swagger_1.ApiForbiddenResponse)({ description: "Access denied." }),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADM),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: swagger_messages_helper_1.UsersMsgSwagger.REMOVE_SUMMARY }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: swagger_messages_helper_1.UsersMsgSwagger.REMOVE_200,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: swagger_messages_helper_1.UsersMsgSwagger.USER_NOT_FOUND,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: message_helper_1.MessagesHelper.ACCESS_DENIED,
    }),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT, type: require("./entities/user.entity").User }),
    __param(0, (0, common_1.Param)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    (0, common_1.Controller)("users"),
    (0, swagger_1.ApiTags)("Users"),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map