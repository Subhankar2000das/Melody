"use client";

import { Suspense } from "react";

import Navbar from "@/components/layout/navbar";
import UserSidebar from "@/components/layout/user-sidebar";
import MusicPlayer from "@/components/player/music-player";

const NavbarFallback = () => {
  return (
    <div className="border-b border-white/10 bg-[#121212] px-6 py-4">
      <div className="h-10" />
    </div>
  );
};

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col bg-black text-white">
      <Suspense fallback={<NavbarFallback />}>
        <Navbar />
      </Suspense>

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden w-64 border-r border-white/5 md:block">
          <UserSidebar />
        </div>

        <main className="flex-1 overflow-y-auto p-6 pb-28">{children}</main>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-[#181818]">
        <MusicPlayer />
      </div>
    </div>
  );
};

export default UserLayout;