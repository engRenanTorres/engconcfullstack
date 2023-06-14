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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const bcrypt_1 = require("bcrypt");
const role_enum_1 = require("./role.enum");
let User = class User {
    constructor(user) {
        this.id = user === null || user === void 0 ? void 0 : user.id;
        this.name = user === null || user === void 0 ? void 0 : user.name;
        this.email = user === null || user === void 0 ? void 0 : user.email;
        this.roles = user === null || user === void 0 ? void 0 : user.roles;
        this.password = user === null || user === void 0 ? void 0 : user.password;
    }
    hasPassword() {
        this.password = (0, bcrypt_1.hashSync)(this.password, 10);
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, cnpj: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, roles: { required: true, enum: require("./role.enum").Role } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: `name`, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: `cnpj`, nullable: false, unique: true }),
    __metadata("design:type", String)
], User.prototype, "cnpj", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: `email`, nullable: false, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "password", nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "roles", nullable: true, default: 3 }),
    __metadata("design:type", Number)
], User.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "hasPassword", null);
User = __decorate([
    (0, typeorm_1.Entity)("Users"),
    __metadata("design:paramtypes", [Object])
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map