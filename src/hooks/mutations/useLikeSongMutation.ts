import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { addLikedSong } from "@/services/api/library-service";

export const useLikeSongMutation = () => {
  return useMutation({
    mutationFn: ({
      userId,
      songId,
    }: {
      userId: string;
      songId: number;
    }) => addLikedSong(userId, songId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.likedSongs(variables.userId),
      });
    },
  });
};