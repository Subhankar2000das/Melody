"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import Loader from "@/components/ui/loader";

type Props = {
  children: React.ReactNode;
  requireAdmin?: boolean;
};

const ProtectedRoute = ({ children, requireAdmin = false }: Props) => {
  const router = useRouter();
  const { authUser, profile, isHydrated } = useAuthStore();

  useEffect(() => {
    if (!isHydrated) return;

    if (!authUser?.id) {
      router.replace("/login");
      return;
    }

    if (requireAdmin && profile?.role !== "admin") {
      router.replace("/");
    }
  }, [authUser?.id, isHydrated, profile?.role, requireAdmin, router]);

  if (!isHydrated) {
    return <Loader />;
  }

  if (!authUser?.id) {
    return null;
  }

  if (requireAdmin && profile?.role !== "admin") {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;