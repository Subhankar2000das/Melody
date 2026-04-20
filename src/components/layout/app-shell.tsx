"use client";

import UserSidebar from "./user-sidebar";
import UserTopbar from "./user-topbar";
import MusicPlayer from "@/components/player/music-player";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-[#121212] text-white">
      <UserSidebar />

      <div className="flex flex-1 flex-col">
        <UserTopbar />

        <main className="flex-1 overflow-y-auto p-4 pb-24">
          {children}
        </main>
      </div>

      <MusicPlayer />
    </div>
  );
};

export default AppShell;