import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getSongById } from "@/services/api/songs-service";

export const useSongById = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.song(id ?? 0),
    queryFn: () => getSongById(id as number),
    enabled: !!id,
  });
};