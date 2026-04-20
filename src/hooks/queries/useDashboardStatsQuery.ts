import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getDashboardStats } from "@/services/api/dashboard-service";

export const useDashboardStatsQuery = () => {
  return useQuery({
    queryKey: queryKeys.dashboardStats,
    queryFn: getDashboardStats,
  });
};
