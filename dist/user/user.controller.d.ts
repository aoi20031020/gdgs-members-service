import { UserService } from './user.service';
import { User } from '@prisma/client';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(body: {
        email: string;
        name: string;
        password: string;
    }): Promise<User>;
    findOne(id: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(id: string, body: {
        name: string;
        email: string;
    }): Promise<User>;
    remove(id: string): Promise<User>;
}
