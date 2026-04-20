import { useMemo } from "react";
import { useAuthStore } from "@/store/auth-store";

export const useAuthRedirect = () => {
  const { authUser, profile } = useAuthStore();

  return useMemo(() => {
    if (!authUser?.id) return "/login";
    return profile?.role === "admin" ? "/admin/dashboard" : "/";
  }, [authUser?.id, profile?.role]);
};
