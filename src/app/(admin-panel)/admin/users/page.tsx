"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import Header from "@/components/admin/header";
import UsersTable from "@/components/admin/users-table";
import DeleteConfirmation from "@/components/admin/delete-confirmation";
import Input from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/ui/empty-state";

import { useUsersQuery } from "@/hooks/queries/useUsersQuery";
import { useDeleteUserMutation } from "@/hooks/mutations/useDeleteUserMutation";

import type { IRegistration } from "@/typescript/interfaces/user.interface";

const AdminUsersPage = () => {
  const { data: users = [], isLoading } = useUsersQuery();
  const { mutateAsync, isPending } = useDeleteUserMutation();

  const [selectedUser, setSelectedUser] =
    useState<IRegistration | null>(null);

  const [keyword, setKeyword] = useState("");

 
  const filteredUsers = useMemo(() => {
    const q = keyword.toLowerCase().trim();

    if (!q) return users;

    return users.filter(
      (user) =>
        user?.name?.toLowerCase()?.includes(q) ||
        user?.email?.toLowerCase()?.includes(q)
    );
  }, [users, keyword]);

 
  const handleDelete = async () => {
    try {
      if (!selectedUser) return;

      await mutateAsync({
        id: selectedUser.id,
        auth_user_id: selectedUser.auth_user_id,
      });

      toast.success("User deleted successfully");
      setSelectedUser(null);
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-6">
      <Header
        title="Users"
        subtitle="Manage registered users"
      />

   
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search users..."
      />


      {filteredUsers?.length ? (
        <UsersTable
          users={filteredUsers ?? []}
          onDelete={(id: number) => {
            const user =
              filteredUsers?.find((item) => item?.id === id) ?? null;

            if (!user) return;

            setSelectedUser(user);
          }}
        />
      ) : (
        <EmptyState message="No users found" />
      )}

    
      <DeleteConfirmation
        open={!!selectedUser}
        title="Delete User"
        description={`Delete ${selectedUser?.name ?? ""}?`}
        isLoading={isPending}
        onClose={() => setSelectedUser(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminUsersPage;