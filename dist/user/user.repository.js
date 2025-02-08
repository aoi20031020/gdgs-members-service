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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserRepository = class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(email, name) {
        try {
            return await this.prisma.user.create({
                data: { email, name },
            });
        }
        catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }
    async findById(id) {
        try {
            return await this.prisma.user.findUnique({
                where: { id },
                select: { id: true, email: true, name: true },
            });
        }
        catch (error) {
            throw new Error(`Failed to find user with id ${id}: ${error.message}`);
        }
    }
    async findAll() {
        try {
            return await this.prisma.user.findMany();
        }
        catch (error) {
            throw new Error(`Failed to fetch users: ${error.message}`);
        }
    }
    async update(id, name, email) {
        try {
            return await this.prisma.user.update({
                where: { id },
                data: { name, email },
            });
        }
        catch (error) {
            throw new Error(`Failed to update user with id ${id}: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            return await this.prisma.user.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new Error(`Failed to delete user with id ${id}: ${error.message}`);
        }
    }
    async createWithTransaction(email, name) {
        const transaction = await this.prisma.$transaction(async (prisma) => {
            return await prisma.user.create({
                data: { email, name },
            });
        });
        return transaction;
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRepository);
//# sourceMappingURL=user.repository.js.map