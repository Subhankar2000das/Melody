import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { deleteSong } from "@/services/api/songs-service";

export const useDeleteSongMutation = () => {
  return useMutation({
    mutationFn: (songId: number) => deleteSong(songId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.songs,
      });
    },
  });
};