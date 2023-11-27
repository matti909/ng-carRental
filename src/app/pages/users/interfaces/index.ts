
export enum UserRole {
  ADMIN = 'ADMIN',
  SALESPERSON = 'SALESPERSON',
}

export interface SignupResponse {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  email: string;
  username: string;
  role: UserRole;
}


