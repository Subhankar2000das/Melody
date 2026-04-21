"use client";

import type { ISong } from "@/typescript/interfaces/song.interface";

type Props = {
  songs: ISong[];
  selectedSongIds: number[];
  onToggle: (songId: number) => void;
};

const AttachSongsList = ({ songs, selectedSongIds, onToggle }: Props) => {
  return (
    <div className="space-y-3">
      {songs.map((song) => {
        const checked = selectedSongIds.includes(song.id);

        return (
          <button
            key={song.id}
            type="button"
            onClick={() => onToggle(song.id)}
            className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
              checked
                ? "border-[#1db954] bg-[#1a1a1a]"
                : "border-white/10 bg-[#141414] hover:bg-white/5"
            }`}
          >
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={song.image}
                alt={song.title}
                className="h-12 w-12 rounded object-cover"
              />

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {song.title}
                </p>
                <p className="truncate text-xs text-gray-400">
                  {song.artist}
                  {song.category ? ` • ${song.category}` : ""}
                </p>
              </div>
            </div>

            <div className="ml-3">
              <div
                className={`h-5 w-5 rounded border ${
                  checked
                    ? "border-[#1db954] bg-[#1db954]"
                    : "border-white/20 bg-transparent"
                }`}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default AttachSongsList;