import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getSongsForAttach } from "@/services/api/songs-service";

export const useSongsForAttachQuery = (keyword?: string) => {
  return useQuery({
    queryKey: queryKeys.songsForAttach(keyword),
    queryFn: () => getSongsForAttach(keyword),
  });
};
