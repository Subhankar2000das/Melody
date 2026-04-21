import { db } from "@/lib/supabase/database";
import type { IRegistration } from "@/typescript/interfaces/user.interface";

export const getUsers = async (): Promise<IRegistration[]> => {
  const { data, error } = await db
    .registration()
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as IRegistration[];
};

export const getTopUsers = async (): Promise<IRegistration[]> => {
  const { data, error } = await db
    .registration()
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as IRegistration[];
};

export const getUsersCount = async (): Promise<number> => {
  const { count, error } = await db
    .registration()
    .select("*", { count: "exact", head: true });

  if (error) {
    throw new Error(error.message);
  }

  return count ?? 0;
};

export const deleteUser = async (
  id: number,
  auth_user_id: string
) => {
  const response = await fetch("/api/admin/delete-user", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      auth_user_id,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "Failed to delete user");
  }

  return data;
};