import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getUsersCount } from "@/services/api/users-service";

export const useUsersCountQuery = () => {
  return useQuery({
    queryKey: queryKeys.usersCount,
    queryFn: getUsersCount,
  });
};
