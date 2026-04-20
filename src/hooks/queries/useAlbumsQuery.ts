import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getAlbums } from "@/services/api/albums-service";

export const useAlbumsQuery = () => {
  return useQuery({
    queryKey: queryKeys.albums,
    queryFn: getAlbums,
  });
};
