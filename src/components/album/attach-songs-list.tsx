"use client";

import type { ISong } from "@/typescript/interfaces/song.interface";

type Props = {
  songs: ISong[];
  selectedSongIds: number[];
  onToggle: (songId: number) => void;
};

const AttachSongsList = ({ songs, selectedSongIds, onToggle }: Props) => {
  return (
    <div className="overflow-hidden rounded-xl border border-white/5 bg-[#181818]">
      <div className="grid grid-cols-[60px_1fr_120px] gap-4 border-b border-white/5 px-4 py-3 text-xs uppercase tracking-wide text-gray-400">
        <span>Select</span>
        <span>Song</span>
        <span>Category</span>
      </div>

      <div>
        {songs?.map((song) => {
          const checked = selectedSongIds.includes(song.id);

          return (
            <label
              key={song.id}
              className="grid cursor-pointer grid-cols-[60px_1fr_120px] gap-4 px-4 py-3 transition hover:bg-white/5"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(song.id)}
                  className="h-4 w-4 accent-emerald-500"
                />
              </div>

              <div className="flex min-w-0 items-center gap-3">
                <img
                  src={song.image}
                  alt={song.title}
                  className="h-10 w-10 rounded object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{song.title}</p>
                  <p className="truncate text-xs text-gray-400">{song.artist}</p>
                </div>
              </div>

              <div className="flex items-center">
                <span className="rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-300">
                  {song.category}
                </span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default AttachSongsList;