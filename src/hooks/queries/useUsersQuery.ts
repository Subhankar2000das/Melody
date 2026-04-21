import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/api/users-service";

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60,
  });
};