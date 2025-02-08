import { PrismaService } from '../prisma/prisma.service';
import { User as InputUser } from './user.type';
import { User } from '@prisma/client';
export declare class UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: InputUser): Promise<User>;
    findById(schoolId: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(schoolId: string, data: InputUser): Promise<User>;
    delete(schoolId: string): Promise<User>;
    createWithTransaction(data: InputUser): Promise<User>;
}
