import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { addSong } from "@/services/api/songs-service";
import type { ICreateSongPayload } from "@/typescript/interfaces/song.interface";

export const useAddSongMutation = () => {
  return useMutation({
    mutationFn: ({ payload, files }: { payload: Omit<ICreateSongPayload, "file" | "image">; files: { audioFile: File; imageFile: File } }) =>
      addSong(payload, files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.songs });
    },
  });
};
