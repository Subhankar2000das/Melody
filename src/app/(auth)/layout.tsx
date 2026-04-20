"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthRedirect from "@/components/auth/auth-redirect";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <AuthRedirect>
      <div className="min-h-screen bg-gradient-to-b from-[#121212] to-black text-white">
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#181818] p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {children}
          </div>
        </div>
      </div>
    </AuthRedirect>
  );
};

export default AuthLayout;