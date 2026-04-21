import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { deleteUser } from "@/services/api/users-service";

export const useDeleteUserMutation = () => {
  return useMutation({
    mutationFn: ({
      id,
      auth_user_id,
    }: {
      id: number;
      auth_user_id: string;
    }) => deleteUser(id, auth_user_id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["top-users"] });
      queryClient.invalidateQueries({ queryKey: ["users-count"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
};


  // (auth.uid() = auth_user_id)