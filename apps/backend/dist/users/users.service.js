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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const exceptions_1 = require("@nestjs/common/exceptions");
const role_enum_1 = require("./entities/role.enum");
const DatabaseError_1 = require("../common/errors/types/DatabaseError");
let UsersService = class UsersService {
    constructor() {
        this.logger = new common_1.Logger("UserService");
    }
    async onModuleInit() {
        const users = await this.usersRepository.find();
        if (users.length === 0) {
            this.logger.log("adm user has been created");
            const adm = {
                name: "Adm",
                cnpj: "00000000000",
                email: "adm@adm.com",
                password: "IamAdm123",
                roles: role_enum_1.Role.ADM,
            };
            const normal = {
                name: "Normal",
                cnpj: "00000000002",
                email: "normal@normal.com",
                password: "IamNormal123",
                roles: role_enum_1.Role.USER,
            };
            const admUser = this.usersRepository.create(adm);
            await this.usersRepository.save(admUser);
            const user = this.usersRepository.create(normal);
            await this.usersRepository.save(user);
            return;
        }
        this.logger.log("Dont need to create adm. users.length = " + users.length);
        return;
    }
    async findAll() {
        return this.usersRepository.find();
    }
    async findById(id) {
        const user = await this.usersRepository.findOneBy({ id: Number(id) });
        this.checkIfUserExiste(user, id);
        return user;
    }
    async findByEmail(email) {
        const user = await this.usersRepository.findOneBy({ email: email });
        try {
            this.checkIfUserExiste(user, email);
        }
        catch (error) {
            throw new exceptions_1.NotFoundException(error.message);
        }
        return await this.usersRepository.findOneBy({ email: email });
    }
    async create(createUserDTO) {
        try {
            const user = this.usersRepository.create(createUserDTO);
            return await this.usersRepository.save(user);
        }
        catch (error) {
            throw new DatabaseError_1.DataBaseError(error.message, error.code);
        }
    }
    async update(email, updateUserDTO) {
        const user = await this.usersRepository.findOneBy({ email: email });
        const userUpdated = await this.usersRepository.preload(Object.assign({ id: user === null || user === void 0 ? void 0 : user.id }, updateUserDTO));
        this.checkIfUserExiste(user, String(user === null || user === void 0 ? void 0 : user.id));
        return await this.usersRepository.save(userUpdated);
    }
    async remove(email) {
        const user = await this.usersRepository.findOne({
            where: { email },
        });
        this.checkIfUserExiste(user, String(user === null || user === void 0 ? void 0 : user.id));
        return await this.usersRepository.remove(user);
    }
    checkIfUserExiste(user, id) {
        if (!user) {
            throw new exceptions_1.NotFoundException(`User not found by id ${id}`);
        }
    }
};
__decorate([
    (0, common_1.Inject)("USER_REPOSITORY"),
    __metadata("design:type", typeorm_1.Repository)
], UsersService.prototype, "usersRepository", void 0);
UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map