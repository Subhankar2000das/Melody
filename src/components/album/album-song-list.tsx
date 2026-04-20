"use client";

import type { ISong } from "@/typescript/interfaces/song.interface";
import { usePlayerStore } from "@/store/player-store";
import { formatDuration } from "@/services/helpers/format-duration";

type Props = {
  songs: ISong[];
};

const AlbumSongList = ({ songs }: Props) => {
  const { play, currentSong } = usePlayerStore();

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-white/5 bg-[#181818]">
      <div className="grid grid-cols-[40px_1fr_100px] gap-4 border-b border-white/5 px-4 py-3 text-xs uppercase tracking-wide text-gray-400">
        <span>#</span>
        <span>Title</span>
        <span>Duration</span>
      </div>

      <div>
        {songs.map((song, index) => {
          const isActive = currentSong?.id === song.id;

          return (
            <button
              key={song.id}
              type="button"
              onClick={() => play(song, songs)}
              className={`grid w-full grid-cols-[40px_1fr_100px] gap-4 px-4 py-3 text-left transition hover:bg-white/5 ${
                isActive ? "bg-white/5" : ""
              }`}
            >
              <span className="text-sm text-gray-400">{index + 1}</span>

              <div className="flex min-w-0 items-center gap-3">
                <img
                  src={song.image}
                  alt={song.title}
                  className="h-10 w-10 rounded object-cover"
                />
                <div className="min-w-0">
                  <p
                    className={`truncate text-sm font-medium ${
                      isActive ? "text-emerald-400" : "text-white"
                    }`}
                  >
                    {song.title}
                  </p>
                  <p className="truncate text-xs text-gray-400">
                    {song.artist}
                  </p>
                </div>
              </div>

              <span className="text-sm text-gray-400">
                {formatDuration(song.duration)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AlbumSongList;