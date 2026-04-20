import { useAuthStore } from "@/store/auth-store";

export const useAdminGuard = () => {
  const { authUser, profile, isHydrated, isAdmin } = useAuthStore();

  return {
    authUser,
    profile,
    isHydrated,
    isAdmin,
    isAuthenticated: !!authUser?.id,
  };
};
