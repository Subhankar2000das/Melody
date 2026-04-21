"use client";

import TableWrapper from "@/components/ui/table-wrapper";
import Button from "@/components/ui/button";
import type { IRegistration } from "@/typescript/interfaces/user.interface";

type Props = {
  users: IRegistration[];
  onDelete?: (id: number) => void;
  showActions?: boolean;
};

const UsersTable = ({
  users,
  onDelete,
  showActions = true,
}: Props) => {
  return (
    <TableWrapper>
      <table className="w-full text-sm text-white">
        <thead>
          <tr className="border-b border-white/10 text-left text-gray-400">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Auth User ID</th>
            {showActions ? <th className="p-3 text-right">Actions</th> : null}
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-white/5">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3 capitalize">{user.role}</td>
              <td className="max-w-[220px] truncate p-3 text-xs text-gray-400">
                {user.auth_user_id}
              </td>

              {showActions ? (
                <td className="p-3 text-right">
                  <Button
                    type="button"
                    onClick={() => onDelete?.(user.id)}
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default UsersTable;