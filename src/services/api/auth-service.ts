import { supabaseAuth } from "@/lib/supabase/auth";

export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabaseAuth.signIn(email, password);
  if (error) throw new Error(error.message);
  return data?.user;
};

export const registerUser = async (email: string, password: string) => {
  const { data, error } = await supabaseAuth.signUp(email, password);
  if (error) throw new Error(error.message);
  return data?.user;
};

export const logoutUser = async () => {
  await supabaseAuth.signOut();
};
