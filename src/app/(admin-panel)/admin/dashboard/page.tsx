"use client";

import Header from "@/components/admin/header";
import DashboardStats from "@/components/admin/dashboard-stats";
import Loader from "@/components/ui/loader";
import { useDashboardStatsQuery } from "@/hooks/queries/useDashboardStatsQuery";

const DashboardPage = () => {
  const { data, isLoading } = useDashboardStatsQuery();

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <Header
        title="Dashboard"
        subtitle="Manage songs, albums, and users from one place."
      />
      <DashboardStats stats={data} />
    </div>
  );
};

export default DashboardPage;