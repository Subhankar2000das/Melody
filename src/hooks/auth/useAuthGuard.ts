import { useAuthStore } from "@/store/auth-store";

export const useAuthGuard = () => {
  const { authUser, isHydrated, status } = useAuthStore();

  return {
    authUser,
    isHydrated,
    isAuthenticated: !!authUser?.id,
    status,
  };
};
