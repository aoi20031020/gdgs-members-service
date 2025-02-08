import { UserRepository } from './user.repository';
import { User } from './user.type';
import { User as OutputUser } from '@prisma/client';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    createUser(data: User): Promise<User>;
    getUserById(schoolId: string): Promise<User | null>;
    getAllUsers(): Promise<User[] | null>;
    updateUser(schoolId: string, data: User): Promise<User>;
    deleteUser(schoolId: string): Promise<User>;
    convertToUserType(data: OutputUser): Promise<User>;
}
