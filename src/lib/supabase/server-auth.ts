import { createServerSupabase } from "./server";

export const getServerSessionUser = async () => {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data.user ?? null;
};