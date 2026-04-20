import { db } from "@/lib/supabase/database";
import { buildSearchPattern } from "../helpers/search-helper";

export const searchAll = async (keyword: string) => {
  const pattern = buildSearchPattern(keyword);

  const { data: songs, error: songsError } = await db
    .songs()
    .select("*")
    .or(`title.ilike.${pattern},artist.ilike.${pattern},category.ilike.${pattern}`);

  if (songsError) throw new Error(songsError.message);

  const { data: albums, error: albumsError } = await db
    .albums()
    .select("*")
    .or(`title.ilike.${pattern},artist.ilike.${pattern}`);

  if (albumsError) throw new Error(albumsError.message);

  return {
    songs: songs ?? [],
    albums: albums ?? [],
  };
};
