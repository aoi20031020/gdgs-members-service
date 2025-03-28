export type Auth = {
    fullName: string;
    studentId: string;
};
export type AuthContent = {
    token: string;
};
export type JwtPayload = {
    userId: number;
    role: 'ADMIN' | 'DEVELOPER' | 'MEMBER' | 'CORE_MEMBER';
};
