export type User = {
  id: number;
  studentId: string;
  name: string;
  email: string;
  year: number;
  teamTechnology: boolean;
  teamMarketing: boolean;
  teamEvent: boolean;
  role: Role;
};

export type Role = 'ADMIN' | 'DEVELOPER' | 'MEMBER' | 'CORE_MEMBER';
