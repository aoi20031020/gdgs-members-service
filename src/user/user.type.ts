export type User = {
  studentId: string;
  name: string;
  email: string;
  year: number;
  teamTechnology: boolean;
  teamMarketing: boolean;
  teamEvent: boolean;
};

export type Role = 'ADMIN' | 'DEVELOPER' | 'MEMBER' | 'CORE_MEMBER';
