export type UserRole = "admin" | "user";

export interface IRegistration {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  auth_user_id: string;
  created_at?: string;
}