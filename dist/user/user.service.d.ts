import { UserRepository } from './user.repository';
import { User } from '@prisma/client';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    createUser(email: string, name: string): Promise<User>;
    getUserById(id: number): Promise<User | null>;
    getAllUsers(): Promise<User[]>;
    updateUser(id: number, name: string, email: string): Promise<User>;
    deleteUser(id: number): Promise<User>;
}
