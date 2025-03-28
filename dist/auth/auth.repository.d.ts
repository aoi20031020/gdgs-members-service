import { PrismaService } from '../prisma/prisma.service';
import { User } from '../user/user.type';
export declare class AuthRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByStudentId(studentId: string): Promise<User | null>;
}
