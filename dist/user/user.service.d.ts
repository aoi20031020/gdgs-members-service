import { UserRepository } from './user.repository';
import { User } from './user.type';
import { User as OutputUser } from '@prisma/client';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    createUser(data: User): Promise<User>;
    getUserById(studentId: string): Promise<User | null>;
    getAllUsers(): Promise<User[] | null>;
    updateUser(studentId: string, data: User): Promise<User>;
    deleteUser(studentId: string): Promise<User>;
    convertToUserType(data: OutputUser): Promise<User>;
}
