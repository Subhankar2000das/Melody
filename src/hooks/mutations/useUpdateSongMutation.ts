import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { updateSong } from "@/services/api/songs-service";
import type { IUpdateSongPayload } from "@/typescript/interfaces/song.interface";

type UpdateSongArgs = {
  payload: IUpdateSongPayload;
  files?: {
    audioFile?: File | null;
    imageFile?: File | null;
  };
};

export const useUpdateSongMutation = () => {
  return useMutation({
    mutationFn: ({ payload, files }: UpdateSongArgs) =>
      updateSong(payload, files),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.songs,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.song(variables.payload.id),
      });

      if (variables.payload.album_id) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.songsByAlbum(variables.payload.album_id),
        });
      }
    },
  });
};