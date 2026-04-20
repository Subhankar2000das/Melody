import AdminLayout from "@/layout/admin-layout";
import ProtectedRoute from "@/components/auth/protected-route";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
};

export default Layout;