import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { createPlaylist } from "@/services/api/library-service";
import type { ICreatePlaylistPayload } from "@/typescript/interfaces/library.interface";

export const useCreatePlaylistMutation = () => {
  return useMutation({
    mutationFn: (payload: ICreatePlaylistPayload) => createPlaylist(payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.playlists(variables.user_id),
      });
    },
  });
};