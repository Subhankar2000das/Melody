import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getPlaylists } from "@/services/api/library-service";

export const usePlaylistsQuery = (userId?: string) => {
  return useQuery({
    queryKey: queryKeys.playlists(userId ?? ""),
    queryFn: () => getPlaylists(userId as string),
    enabled: !!userId,
    staleTime: 1000 * 60,
  });
};