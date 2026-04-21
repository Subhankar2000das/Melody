import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { attachSongsToAlbum } from "@/services/api/albums-service";

export const useAttachSongsToAlbumMutation = () => {
  return useMutation({
    mutationFn: ({
      albumId,
      songIds,
    }: {
      albumId: number;
      songIds: number[];
    }) => attachSongsToAlbum(albumId, songIds),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.songs });
      queryClient.invalidateQueries({ queryKey: queryKeys.albums });
      queryClient.invalidateQueries({
        queryKey: queryKeys.songsByAlbum(variables.albumId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.songsForAttach("", variables.albumId),
      });
    },
  });
};