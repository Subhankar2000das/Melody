"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButton from "@/components/auth/auth-button";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Songs", href: "/admin/songs" },
  { label: "Albums", href: "/admin/albums" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col justify-between border-r border-white/5 bg-[#0f0f0f] p-4 text-white">
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Melody</h1>
          <p className="text-sm text-gray-400">Admin Dashboard</p>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-[#1db954] text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4">
        <AuthButton />
      </div>
    </aside>
  );
};

export default Sidebar;