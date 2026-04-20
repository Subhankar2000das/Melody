import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getSongsByCategory } from "@/services/api/songs-service";

export const useSongsByCategory = (category?: string) => {
  return useQuery({
    queryKey: queryKeys.songsByCategory(category ?? ""),
    queryFn: () => getSongsByCategory(category as string),
    enabled: !!category,
  });
};
