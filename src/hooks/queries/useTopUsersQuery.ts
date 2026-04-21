import { useQuery } from "@tanstack/react-query";
import { getTopUsers } from "@/services/api/users-service";

export const useTopUsersQuery = () => {
  return useQuery({
    queryKey: ["top-users"],
    queryFn: getTopUsers,
    staleTime: 1000 * 60,
  });
};