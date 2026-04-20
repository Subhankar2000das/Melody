import { supabase } from "./client";

export const db = {
  songs: () => supabase.from("songs"),
  albums: () => supabase.from("albums"),
  registration: () => supabase.from("registration"),
};
