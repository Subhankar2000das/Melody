"use client";

import TableWrapper from "@/components/ui/table-wrapper";
import Button from "@/components/ui/button";
import { formatDuration } from "@/services/helpers/format-duration";
import type { ISong } from "@/typescript/interfaces/song.interface";

type Props = {
  songs: ISong[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const SongsTable = ({ songs, onEdit, onDelete }: Props) => {
  return (
    <TableWrapper>
      <table className="w-full text-sm text-white">
        <thead>
          <tr className="border-b border-white/10 text-left text-gray-400">
            <th className="p-3">Song</th>
            <th className="p-3">Artist</th>
            <th className="p-3">Duration</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {songs.map((song) => (
            <tr key={song.id} className="border-b border-white/5">
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <img
                    src={song.image}
                    alt={song.title}
                    className="h-10 w-10 rounded object-cover"
                  />
                  <span className="truncate">{song.title}</span>
                </div>
              </td>

              <td className="p-3">{song.artist}</td>
              <td className="p-3">{formatDuration(song.duration)}</td>

              <td className="p-3 text-right">
                <div className="flex justify-end gap-2">
                  <Button type="button" onClick={() => onEdit(song.id)}>
                    Edit
                  </Button>

                  <Button
                    type="button"
                    onClick={() => onDelete(song.id)}
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default SongsTable;