import { supabase } from "./client";

export const storageBuckets = {
  songsFile: supabase.storage.from("songs-file"),
  songsImage: supabase.storage.from("songs-image"),
  albumsImage: supabase.storage.from("album-image"),
};
