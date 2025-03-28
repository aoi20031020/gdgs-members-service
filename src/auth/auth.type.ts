export type Auth = {
  fullName: string;
  studentId: string;
};

export type AuthContent = {
  token: string;
};

export type JwtPayload = {
  userId: number; // ユーザーID
  role: 'ADMIN' | 'DEVELOPER' | 'MEMBER' | 'CORE_MEMBER'; // ユーザーの役職
};
