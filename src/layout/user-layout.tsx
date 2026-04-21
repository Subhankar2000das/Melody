"use client";

import { Suspense, useState } from "react";

import Navbar from "@/components/layout/navbar";
import UserSidebar from "@/components/layout/user-sidebar";
import MusicPlayer from "@/components/player/music-player";

const NavbarFallback = () => {
  return (
    <div className="border-b border-white/10 bg-[#121212] px-4 py-4 md:px-6">
      <div className="h-10" />
    </div>
  );
};

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Suspense fallback={<NavbarFallback />}>
        <Navbar onMenuClick={() => setOpen(true)} />
      </Suspense>

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden w-64 border-r border-white/5 md:block">
          <UserSidebar />
        </div>

        {open ? (
          <div className="fixed inset-0 z-50 bg-black/70 md:hidden">
            <div className="h-full w-64 bg-[#121212] shadow-2xl">
              <UserSidebar onClose={() => setOpen(false)} />
            </div>
          </div>
        ) : null}

        <main className="flex-1 overflow-y-auto px-4 py-4 pb-32 md:px-6 md:py-6 md:pb-28">
          {children}
        </main>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#181818]">
        <MusicPlayer />
      </div>
    </div>
  );
};

export default UserLayout;