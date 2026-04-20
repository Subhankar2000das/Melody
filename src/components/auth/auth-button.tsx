"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

const AuthButton = () => {
  const router = useRouter();
  const { authUser, logout } = useAuthStore();

  const handleClick = async () => {
    if (authUser?.id) {
      await logout();
      router.push("/");
      return;
    }

    router.push("/login");
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      variant={authUser?.id ? "danger" : "primary"}
      className="w-full"
    >
      {authUser?.id ? "Logout" : "Login"}
    </Button>
  );
};

export default AuthButton;