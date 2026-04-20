"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Songs", href: "/songs" },
  { label: "Albums", href: "/albums" },
  { label: "Liked Songs", href: "/liked-songs" },
  { label: "My Library", href: "/my-library" },
];

const UserSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col bg-black text-white">
      <div className="flex-1 p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Melody</h1>
          <p className="text-sm text-gray-400">melody itni surily kyun hain</p>
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
    </aside>
  );
};

export default UserSidebar;