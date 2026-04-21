import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getSongsForAttach } from "@/services/api/songs-service";

export const useSongsForAttachQuery = (keyword?: string, albumId?: number) => {
  const trimmed = keyword?.trim() ?? "";

  return useQuery({
    queryKey: queryKeys.songsForAttach(trimmed, albumId),
    queryFn: () => getSongsForAttach(trimmed, albumId),
    enabled: !!albumId,
    staleTime: 1000 * 30,
  });
};