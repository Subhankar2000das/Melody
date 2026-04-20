import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { updateAlbum } from "@/services/api/albums-service";
import type { IUpdateAlbumPayload } from "@/typescript/interfaces/album.interface";

type UpdateAlbumArgs = {
  payload: IUpdateAlbumPayload;
  imageFile?: File | null;
};

export const useUpdateAlbumMutation = () => {
  return useMutation({
    mutationFn: ({ payload, imageFile }: UpdateAlbumArgs) =>
      updateAlbum(payload, imageFile),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.albums,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.album(variables.payload.id),
      });
    },
  });
};