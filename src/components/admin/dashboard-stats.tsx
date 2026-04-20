import type { IDashboardStats } from "@/typescript/interfaces/dashboard.interface";
import StatsGrid from "./stats-grid";

type Props = {
  stats: IDashboardStats;
};

const DashboardStats = ({ stats }: Props) => {
  const items = [
    { title: "Total Songs", value: stats.totalSongs },
    { title: "Total Albums", value: stats.totalAlbums },
    { title: "Total Users", value: stats.totalUsers },
  ];

  return <StatsGrid items={items} />;
};

export default DashboardStats;