"use client";

import TableWrapper from "@/components/ui/table-wrapper";
import Button from "@/components/ui/button";
import type { IAlbum } from "@/typescript/interfaces/album.interface";

type Props = {
  albums: IAlbum[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onAttachSongs: (id: number) => void;
};

const AlbumsTable = ({
  albums,
  onEdit,
  onDelete,
  onAttachSongs,
}: Props) => {
  return (
    <TableWrapper>
      <table className="w-full text-sm text-white">
        <thead>
          <tr className="border-b border-white/10 text-left text-gray-400">
            <th className="p-3">Album</th>
            <th className="p-3">Artist</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {albums.map((album) => (
            <tr key={album.id} className="border-b border-white/5">
              <td className="flex items-center gap-3 p-3">
                <img
                  src={album.image}
                  className="h-10 w-10 rounded object-cover"
                />
                <span>{album.title}</span>
              </td>

              <td className="p-3">{album.artist}</td>

              <td className="p-3 text-right">
                <div className="flex flex-wrap justify-end gap-2">
                  <Button onClick={() => onAttachSongs(album.id)}>
                    Attach
                  </Button>
                  <Button onClick={() => onEdit(album.id)}>Edit</Button>
                  <Button
                    onClick={() => onDelete(album.id)}
                    className="bg-red-500 hover:bg-red-600"
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

export default AlbumsTable;