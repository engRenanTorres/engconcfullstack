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
exports.CreateUserDto = exports.CreateSpecialUserDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const message_helper_1 = require("../../helpers/message.helper");
const regex_helper_1 = require("../../helpers/regex.helper");
const role_enum_1 = require("../entities/role.enum");
const swagger_1 = require("@nestjs/swagger");
class CreateSpecialUserDto {
    constructor() {
        this.roles = 1;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, email: { required: true, type: () => String }, roles: { required: true, default: 1, enum: require("../entities/role.enum").Role } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: "Nome completo da empresa." }),
    __metadata("design:type", String)
], CreateSpecialUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: "Cnpj da empresa." }),
    (0, class_validator_1.Matches)(regex_helper_1.RegexHelper.cnpj, {
        message: message_helper_1.MessagesHelper.CNPJ_VALID,
    }),
    __metadata("design:type", String)
], CreateSpecialUserDto.prototype, "cnpj", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: "Email para acesso da empresa." }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateSpecialUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: message_helper_1.MessagesHelper.PASSWORD_VALID }),
    (0, class_validator_1.Matches)(regex_helper_1.RegexHelper.password, {
        message: message_helper_1.MessagesHelper.PASSWORD_VALID,
    }),
    __metadata("design:type", String)
], CreateSpecialUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: "Nível de acesso do usuário.", default: 1 }),
    __metadata("design:type", Number)
], CreateSpecialUserDto.prototype, "roles", void 0);
exports.CreateSpecialUserDto = CreateSpecialUserDto;
class CreateUserDto extends (0, swagger_1.OmitType)(CreateSpecialUserDto, ["roles"]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map