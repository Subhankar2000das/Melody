import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { detachSongFromAlbum } from "@/services/api/albums-service";

export const useDetachSongFromAlbumMutation = () => {
  return useMutation({
    mutationFn: ({ songId }: { songId: number; albumId: number }) =>
      detachSongFromAlbum(songId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.songs });
      queryClient.invalidateQueries({
        queryKey: queryKeys.songsByAlbum(variables.albumId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.songsForAttach(""),
      });
    },
  });
};
