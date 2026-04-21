"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
import Button from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

type Props = {
  onClose?: () => void;
};

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Songs", href: "/admin/songs" },
  { label: "Albums", href: "/admin/albums" },
  { label: "Users", href: "/admin/users" },
];

const AdminSidebar = ({ onClose }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { authUser, logout } = useAuthStore();

  const handleAuthClick = async () => {
    if (authUser?.id) {
      await logout();
      router.push("/");
      return;
    }

    router.push("/login");
  };

  return (
    <aside className="flex h-full w-64 flex-col bg-black text-white">
      <div className="flex-1 p-4">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Melody Admin</h1>
            <p className="text-sm text-gray-400">Manage your platform</p>
          </div>

          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white md:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          ) : null}
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`block rounded-lg px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/10 p-4">
        <Button
          type="button"
          onClick={handleAuthClick}
          className={
            authUser?.id
              ? "w-full bg-red-500 text-white hover:bg-red-600"
              : "w-full bg-[#1db954] text-black hover:bg-[#1ed760]"
          }
        >
          {authUser?.id ? "Logout" : "Login"}
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;