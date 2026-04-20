import type { IRegistration } from "./user.interface";

export type AuthStatus =
  | "idle"
  | "loading"
  | "authenticated"
  | "unauthenticated";

export interface IAuthUser {
  id: string;
  email: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IAuthStore {
  authUser: IAuthUser | null;
  profile: IRegistration | null;

  status: AuthStatus;
  isHydrated: boolean;

  isAdmin: boolean;
  isUser: boolean;

  setAuth: (data: {
    authUser: IAuthUser | null;
    profile: IRegistration | null;
  }) => void;

  clearAuth: () => void;
  setHydrated: (value: boolean) => void;

  initializeAuth: () => Promise<void>;

  login: (payload: ILoginPayload) => Promise<{
    authUser: IAuthUser;
    profile: IRegistration | null;
  }>;

  register: (payload: IRegisterPayload) => Promise<{
    authUser: IAuthUser;
    profile: IRegistration | null;
  }>;

  logout: () => Promise<void>;
}