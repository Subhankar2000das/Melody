"use client";

import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen bg-[#0f0f0f] text-white">
      {/* Sidebar */}
      <div className="hidden md:block w-64 border-r border-white/5">
        <Sidebar />
      </div>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-white/5">
          <Header />
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;