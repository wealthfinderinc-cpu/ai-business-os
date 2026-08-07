export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: AuthUser;
}