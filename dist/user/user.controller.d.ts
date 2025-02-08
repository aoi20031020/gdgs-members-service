import { UserService } from './user.service';
import { User } from './user.type';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(data: User): Promise<User>;
    findOne(id: string): Promise<User | null>;
    findAll(): Promise<User[] | null>;
    update(schoolId: string, data: User): Promise<User>;
    remove(id: string): Promise<User>;
}
