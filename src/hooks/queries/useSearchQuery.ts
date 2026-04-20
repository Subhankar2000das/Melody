import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { searchAll } from "@/services/api/search-service";

export const useSearchQuery = (keyword?: string) => {
  return useQuery({
    queryKey: queryKeys.search(keyword ?? ""),
    queryFn: () => searchAll(keyword as string),
    enabled: !!keyword?.trim(),
  });
};
