import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { removeSongFromPlaylist } from "@/services/api/library-service";

export const useRemoveSongFromPlaylistMutation = () => {
  return useMutation({
    mutationFn: ({
      playlistId,
      songId,
    }: {
      playlistId: number;
      songId: number;
    }) => removeSongFromPlaylist(playlistId, songId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.playlistSongs(variables.playlistId),
      });
    },
  });
};