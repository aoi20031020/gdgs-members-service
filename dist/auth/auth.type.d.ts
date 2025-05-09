import { User } from '../user/user.type';
export type Auth = {
    fullName: string;
    studentId: string;
};
export type AuthContent = {
    token: string;
    user: User;
};
export type JwtPayload = {
    userId: number;
    role: 'ADMIN' | 'DEVELOPER' | 'MEMBER' | 'CORE_MEMBER';
};
