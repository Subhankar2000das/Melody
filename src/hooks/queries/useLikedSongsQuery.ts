import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getLikedSongs } from "@/services/api/library-service";

export const useLikedSongsQuery = (userId?: string) => {
  return useQuery({
    queryKey: queryKeys.likedSongs(userId ?? ""),
    queryFn: () => getLikedSongs(userId as string),
    enabled: !!userId,
    staleTime: 1000 * 60,
  });
};