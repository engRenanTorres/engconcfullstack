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
exports.InvalidPasswordResponse = exports.UserFindSwagger = exports.IndexUsersSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
class IndexUsersSwagger {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], IndexUsersSwagger.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], IndexUsersSwagger.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], IndexUsersSwagger.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], IndexUsersSwagger.prototype, "roles", void 0);
exports.IndexUsersSwagger = IndexUsersSwagger;
class UserFindSwagger extends (0, swagger_1.OmitType)(IndexUsersSwagger, [
    'password',
]) {
}
exports.UserFindSwagger = UserFindSwagger;
class InvalidPasswordResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], InvalidPasswordResponse.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], InvalidPasswordResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InvalidPasswordResponse.prototype, "error", void 0);
exports.InvalidPasswordResponse = InvalidPasswordResponse;
//# sourceMappingURL=index-users.swagger.js.map