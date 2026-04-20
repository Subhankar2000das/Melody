import UserLayout from "@/layout/user-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <UserLayout>{children}</UserLayout>;
};

export default Layout;