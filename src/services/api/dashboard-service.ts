import { db } from "@/lib/supabase/database";

export const getDashboardStats = async () => {
  const { count: songs } = await db.songs().select("*", { count: "exact", head: true });
  const { count: albums } = await db.albums().select("*", { count: "exact", head: true });
  const { count: users } = await db.registration().select("*", { count: "exact", head: true });

  return {
    totalSongs: songs ?? 0,
    totalAlbums: albums ?? 0,
    totalUsers: users ?? 0,
  };
};
