import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { addAlbum } from "@/services/api/albums-service";
import type { ICreateAlbumPayload } from "@/typescript/interfaces/album.interface";

export const useAddAlbumMutation = () => {
  return useMutation({
    mutationFn: ({ payload, imageFile }: { payload: Omit<ICreateAlbumPayload, "image">; imageFile: File }) =>
      addAlbum(payload, imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.albums });
    },
  });
};
