import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getPlaylistSongs } from "@/services/api/library-service";

export const usePlaylistSongsQuery = (playlistId?: number) => {
  return useQuery({
    queryKey: queryKeys.playlistSongs(playlistId ?? 0),
    queryFn: () => getPlaylistSongs(playlistId as number),
    enabled: !!playlistId,
    staleTime: 1000 * 60,
  });
};