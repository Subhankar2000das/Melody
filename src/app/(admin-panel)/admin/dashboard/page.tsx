"use client";

import Header from "@/components/admin/header";
import UsersTable from "@/components/admin/users-table";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/ui/empty-state";
import { useDashboardStatsQuery } from "@/hooks/queries/useDashboardStatsQuery";
import { useTopUsersQuery } from "@/hooks/queries/useTopUsersQuery";

const AdminDashboardPage = () => {
  const { data: stats, isLoading: statsLoading } = useDashboardStatsQuery();
  const { data: topUsers = [], isLoading: usersLoading } = useTopUsersQuery();

  if (statsLoading || usersLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      <Header
        title="Dashboard"
        subtitle="Monitor songs, albums, and users."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-[#181818] p-5">
          <p className="text-sm text-gray-400">Total Songs</p>
          <h3 className="mt-2 text-3xl font-bold text-white">
            {stats?.songsCount ?? 0}
          </h3>
        </div>

        <div className="rounded-2xl bg-[#181818] p-5">
          <p className="text-sm text-gray-400">Total Albums</p>
          <h3 className="mt-2 text-3xl font-bold text-white">
            {stats?.albumsCount ?? 0}
          </h3>
        </div>

        <div className="rounded-2xl bg-[#181818] p-5">
          <p className="text-sm text-gray-400">Total Users</p>
          <h3 className="mt-2 text-3xl font-bold text-white">
            {stats?.usersCount ?? 0}
          </h3>
        </div>

        <div className="rounded-2xl bg-[#181818] p-5">
          <p className="text-sm text-gray-400">Admins</p>
          <h3 className="mt-2 text-3xl font-bold text-white">
            {stats?.adminsCount ?? 0}
          </h3>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Top 5 Users</h2>

        {topUsers.length ? (
          <UsersTable users={topUsers} showActions={false} />
        ) : (
          <EmptyState message="No users found." />
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;