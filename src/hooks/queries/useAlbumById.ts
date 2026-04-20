import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getAlbumById } from "@/services/api/albums-service";

export const useAlbumById = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.album(id ?? 0),
    queryFn: () => getAlbumById(id as number),
    enabled: !!id,
  });
};