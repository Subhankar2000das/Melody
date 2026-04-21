import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { detachSongFromAlbum } from "@/services/api/albums-service";

export const useDetachSongFromAlbumMutation = () => {
  return useMutation({
    mutationFn: ({ songId, albumId }: { songId: number; albumId: number }) =>
      detachSongFromAlbum(songId, albumId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.songs });
      queryClient.invalidateQueries({
        queryKey: queryKeys.songsByAlbum(variables.albumId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.songsForAttach("", variables.albumId),
      });
    },
  });
};