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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(data) {
        const user = await this.userRepository.create(data);
        return this.convertToUserType(user);
    }
    async getUserById(studentId) {
        const user = await this.userRepository.findById(studentId);
        return this.convertToUserType(user);
    }
    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return Promise.all(users.map((user) => this.convertToUserType(user)));
    }
    async updateUser(studentId, data) {
        const user = await this.userRepository.update(studentId, data);
        return this.convertToUserType(user);
    }
    async deleteUser(studentId) {
        const user = await this.userRepository.delete(studentId);
        return this.convertToUserType(user);
    }
    async convertToUserType(data) {
        return {
            id: data.id,
            name: data.name ?? '',
            studentId: data.student_id ?? '',
            email: data.email ?? '',
            year: data.year ?? 0,
            teamEvent: data.team_event ?? false,
            teamMarketing: data.team_marketing ?? false,
            teamTechnology: data.team_technology ?? false,
            role: data.role,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map