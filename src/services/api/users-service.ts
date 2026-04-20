import { db } from "@/lib/supabase/database";

// GET ALL USERS
export const getUsers = async () => {
  const { data, error } = await db.registration().select("*");

  if (error) throw new Error(error.message);

  return data ?? [];
};

// ✅ ADD THIS FUNCTION
export const getUsersCount = async () => {
  const { count, error } = await db.registration().select("*", {
    count: "exact",
    head: true,
  });

  if (error) throw new Error(error.message);

  return count ?? 0;
};