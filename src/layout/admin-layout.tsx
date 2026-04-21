"use client";

import { useState } from "react";
import AdminSidebar from "@/components/layout/admin-sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="hidden w-64 border-r border-white/10 md:block">
        <AdminSidebar />
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 bg-black/70 md:hidden">
          <div className="h-full w-64 bg-[#121212]">
            <AdminSidebar onClose={() => setOpen(false)} />
          </div>
        </div>
      ) : null}

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;