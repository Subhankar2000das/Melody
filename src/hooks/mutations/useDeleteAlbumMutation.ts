import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { deleteAlbum } from "@/services/api/albums-service";

export const useDeleteAlbumMutation = () => {
  return useMutation({
    mutationFn: (id: number) => deleteAlbum(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.albums });
      queryClient.invalidateQueries({ queryKey: queryKeys.songs });
    },
  });
};
