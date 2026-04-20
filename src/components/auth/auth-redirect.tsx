"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import Loader from "@/components/ui/loader";

const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { authUser, profile, isHydrated } = useAuthStore();

  useEffect(() => {
    if (!isHydrated) return;

    if (authUser?.id) {
      router.replace(profile?.role === "admin" ? "/admin/dashboard" : "/");
    }
  }, [authUser?.id, isHydrated, profile?.role, router]);

  if (!isHydrated) {
    return <Loader />;
  }

  if (authUser?.id) {
    return null;
  }

  return <>{children}</>;
};

export default AuthRedirect;