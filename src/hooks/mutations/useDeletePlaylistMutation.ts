import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { deletePlaylist } from "@/services/api/library-service";

export const useDeletePlaylistMutation = () => {
  return useMutation({
    mutationFn: ({
      playlistId,
      userId,
    }: {
      playlistId: number;
      userId: string;
    }) => deletePlaylist(playlistId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.playlists(variables.userId),
      });
    },
  });
};