import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getSongsByAlbum } from "@/services/api/songs-service";

export const useSongsByAlbum = (albumId?: number) => {
  return useQuery({
    queryKey: queryKeys.songsByAlbum(albumId ?? 0),
    queryFn: () => getSongsByAlbum(albumId as number),
    enabled: !!albumId,
  });
};
