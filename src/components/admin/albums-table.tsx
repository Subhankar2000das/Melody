"use client";

import Link from "next/link";
import Table from "@/components/ui/table";
import Button from "@/components/ui/button";
import type { IAlbum } from "@/typescript/interfaces/album.interface";

type Props = {
  albums: IAlbum[];
  onDelete?: (album: IAlbum) => void;
};

const AlbumsTable = ({ albums, onDelete }: Props) => {
  return (
    <Table headers={["Album", "Artist", "Actions"]}>
      {albums?.map((album) => (
        <tr key={album.id} className="border-b border-gray-800 last:border-b-0">
          <td className="px-4 py-3">
            <div className="flex items-center gap-3">
              <img
                src={album.image}
                alt={album.title}
                className="h-12 w-12 rounded object-cover"
              />
              <span className="font-medium text-white">{album.title}</span>
            </div>
          </td>

          <td className="px-4 py-3 text-gray-300">{album.artist}</td>

          <td className="px-4 py-3">
            <div className="flex flex-wrap gap-2">
              <Link href={`/admin/albums/edit/${album.id}`}>
                <Button variant="secondary" className="px-3 py-1.5 text-sm">
                  Edit
                </Button>
              </Link>

              <Link href={`/admin/albums/attach-songs/${album.id}`}>
                <Button className="px-3 py-1.5 text-sm">Attach Songs</Button>
              </Link>

              <Button
                variant="danger"
                className="px-3 py-1.5 text-sm"
                onClick={() => onDelete?.(album)}
              >
                Delete
              </Button>
            </div>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default AlbumsTable;