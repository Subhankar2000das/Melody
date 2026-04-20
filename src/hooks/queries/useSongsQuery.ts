import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getSongs } from "@/services/api/songs-service";

export const useSongsQuery = () => {
  return useQuery({
    queryKey: queryKeys.songs,
    queryFn: getSongs,
    staleTime: 1000 * 60 * 10,
  });
};