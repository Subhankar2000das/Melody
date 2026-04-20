"use client";

import { useEffect, type PropsWithChildren } from "react";

import QueryProvider from "./query-provider";
import SonnerProvider from "./sonner-provider";

import { useAuthStore } from "@/store/auth-store";

const Providers = ({ children }: PropsWithChildren) => {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <QueryProvider>
     
      <SonnerProvider />

      {children}
    </QueryProvider>
  );
};

export default Providers;