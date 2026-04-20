import { useEffect } from "react";
import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import { getSongs } from "@/services/api/songs-service";

export const usePrefetchSongs = () => {
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.songs,
      queryFn: getSongs,
    });
  }, []);
};
