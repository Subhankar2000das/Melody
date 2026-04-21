import { db } from "@/lib/supabase/database";

export const getDashboardStats = async () => {
  const [
    songsResponse,
    albumsResponse,
    usersResponse,
    adminsResponse,
  ] = await Promise.all([
    db.songs().select("*", { count: "exact", head: true }),
    db.albums().select("*", { count: "exact", head: true }),
    db.registration().select("*", { count: "exact", head: true }),
    db.registration().select("*", { count: "exact", head: true }).eq("role", "admin"),
  ]);

  if (songsResponse.error) throw new Error(songsResponse.error.message);
  if (albumsResponse.error) throw new Error(albumsResponse.error.message);
  if (usersResponse.error) throw new Error(usersResponse.error.message);
  if (adminsResponse.error) throw new Error(adminsResponse.error.message);

  return {
    songsCount: songsResponse.count ?? 0,
    albumsCount: albumsResponse.count ?? 0,
    usersCount: usersResponse.count ?? 0,
    adminsCount: adminsResponse.count ?? 0,
  };
};