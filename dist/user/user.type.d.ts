export type User = {
    schoolId: string;
    name: string;
    email: string;
    year: number;
    teamTechnology: boolean;
    teamMarketing: boolean;
    teamEvent: boolean;
    role: Role;
};
export type Role = 'ADMIN' | 'GENERAL' | 'DEVELOPER';
