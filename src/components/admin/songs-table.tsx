"use client";

import Link from "next/link";
import Table from "@/components/ui/table";
import Button from "@/components/ui/button";
import type { ISong } from "@/typescript/interfaces/song.interface";
import { formatDuration } from "@/services/helpers/format-duration";

type Props = {
  songs: ISong[];
  onDelete?: (song: ISong) => void;
};

const SongsTable = ({ songs, onDelete }: Props) => {
  return (
    <Table headers={["Title", "Artist", "Year", "Category", "Duration", "Actions"]}>
      {songs?.map((song) => (
        <tr key={song.id} className="border-b border-gray-800 last:border-b-0">
          <td className="px-4 py-3">
            <div className="flex items-center gap-3">
              <img
                src={song.image}
                alt={song.title}
                className="h-12 w-12 rounded object-cover"
              />
              <span className="font-medium text-white">{song.title}</span>
            </div>
          </td>
          <td className="px-4 py-3 text-gray-300">{song.artist}</td>
          <td className="px-4 py-3 text-gray-300">{song.year}</td>
          <td className="px-4 py-3 text-gray-300">{song.category}</td>
          <td className="px-4 py-3 text-gray-300">
            {formatDuration(song.duration)}
          </td>
          <td className="px-4 py-3">
            <div className="flex gap-2">
              <Link href={`/admin/songs/edit/${song.id}`}>
                <Button variant="secondary" className="px-3 py-1.5 text-sm">
                  Edit
                </Button>
              </Link>

              <Button
                variant="danger"
                className="px-3 py-1.5 text-sm"
                onClick={() => onDelete?.(song)}
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

export default SongsTable;