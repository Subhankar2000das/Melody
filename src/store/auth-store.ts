import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";

import type {
  IAuthStore,
  ILoginPayload,
  IRegisterPayload,
} from "@/typescript/interfaces/auth.interface";
import type { IRegistration } from "@/typescript/interfaces/user.interface";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message?.trim()) {
    return error.message;
  }

  return fallback;
};

const initialState = {
  authUser: null,
  profile: null,
  status: "idle" as const,
  isHydrated: false,
  isAdmin: false,
  isUser: false,
};

export const useAuthStore = create<IAuthStore>((set) => ({
  ...initialState,

  setAuth: ({ authUser, profile }) => {
    set({
      authUser,
      profile,
      status: authUser ? "authenticated" : "unauthenticated",
      isAdmin: profile?.role === "admin",
      isUser: profile?.role === "user",
    });
  },

  clearAuth: () => {
    set({
      ...initialState,
      status: "unauthenticated",
      isHydrated: true,
    });
  },

  setHydrated: (value) => {
    set({ isHydrated: value });
  },

  initializeAuth: async () => {
    try {
      set({ status: "loading" });

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        throw new Error(error.message);
      }

      if (!user?.id) {
        set({
          ...initialState,
          status: "unauthenticated",
          isHydrated: true,
        });
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("registration")
        .select("*")
        .eq("auth_user_id", user.id)
        .maybeSingle();

      if (profileError) {
        throw new Error(profileError.message);
      }

      const profile = (profileData as IRegistration | null) ?? null;

      set({
        authUser: {
          id: user.id,
          email: user.email ?? "",
        },
        profile,
        status: "authenticated",
        isHydrated: true,
        isAdmin: profile?.role === "admin",
        isUser: profile?.role === "user",
      });
    } catch {
      set({
        ...initialState,
        status: "unauthenticated",
        isHydrated: true,
      });
    }
  },

  login: async ({ email, password }: ILoginPayload) => {
    try {
      set({ status: "loading" });

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      const user = data.user;

      if (!user?.id) {
        throw new Error("Unable to find user after login.");
      }

      const { data: profileData, error: profileError } = await supabase
        .from("registration")
        .select("*")
        .eq("auth_user_id", user.id)
        .maybeSingle();

      if (profileError) {
        throw new Error(profileError.message);
      }

      if (!profileData) {
        throw new Error(
          "Profile not found. Make sure registration.auth_user_id matches auth.users.id."
        );
      }

      const profile = profileData as IRegistration;

      set({
        authUser: {
          id: user.id,
          email: user.email ?? "",
        },
        profile,
        status: "authenticated",
        isHydrated: true,
        isAdmin: profile?.role === "admin",
        isUser: profile?.role === "user",
      });

      return {
        authUser: {
          id: user.id,
          email: user.email ?? "",
        },
        profile,
      };
    } catch (error) {
      set({
        ...initialState,
        status: "unauthenticated",
        isHydrated: true,
      });

      throw new Error(
        getErrorMessage(error, "Login failed. Please try again.")
      );
    }
  },

  register: async ({
    name,
    email,
    password,
    confirmPassword,
  }: IRegisterPayload) => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      set({ status: "loading" });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      const user = data.user;

      if (!user?.id) {
        throw new Error("Unable to create user account.");
      }

      const { data: existingProfile, error: existingError } = await supabase
        .from("registration")
        .select("*")
        .eq("auth_user_id", user.id)
        .maybeSingle();

      if (existingError) {
        throw new Error(existingError.message);
      }

      let profile: IRegistration | null = null;

      if (existingProfile) {
        profile = existingProfile as IRegistration;
      } else {
        const { data: insertedProfile, error: insertError } = await supabase
          .from("registration")
          .insert({
            name,
            email,
            role: "user",
            auth_user_id: user.id,
          })
          .select("*")
          .single();

        if (insertError) {
          throw new Error(insertError.message);
        }

        profile = (insertedProfile as IRegistration) ?? null;
      }

      set({
        authUser: {
          id: user.id,
          email: user.email ?? "",
        },
        profile,
        status: "authenticated",
        isHydrated: true,
        isAdmin: profile?.role === "admin",
        isUser: profile?.role === "user",
      });

      return {
        authUser: {
          id: user.id,
          email: user.email ?? "",
        },
        profile,
      };
    } catch (error) {
      set({
        ...initialState,
        status: "unauthenticated",
        isHydrated: true,
      });

      throw new Error(
        getErrorMessage(error, "Registration failed. Please try again.")
      );
    }
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }

      set({
        ...initialState,
        status: "unauthenticated",
        isHydrated: true,
      });
    } catch (error) {
      throw new Error(
        getErrorMessage(error, "Logout failed. Please try again.")
      );
    }
  },
}));