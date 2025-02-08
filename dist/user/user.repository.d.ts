import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
export declare class UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(email: string, name: string): Promise<User>;
    findById(id: number): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(id: number, name: string, email: string): Promise<User>;
    delete(id: number): Promise<User>;
    createWithTransaction(email: string, name: string): Promise<User>;
}
