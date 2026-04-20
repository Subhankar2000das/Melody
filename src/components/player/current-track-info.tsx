"use client";

import { usePlayerStore } from "@/store/player-store";

const CurrentTrackInfo = () => {
  const { currentSong } = usePlayerStore();

  if (!currentSong) {
    return (
      <div className="flex min-w-[220px] items-center gap-3 text-white">
        <div className="flex h-14 w-14 items-center justify-center rounded bg-[#222] text-sm text-gray-400">
          N
        </div>
        <div>
          <p className="text-sm font-medium text-gray-400">No song playing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-w-[220px] max-w-[260px] items-center gap-3">
      <img
        src={currentSong.image}
        alt={currentSong.title}
        className="h-14 w-14 rounded object-cover"
      />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-white">
          {currentSong.title}
        </p>
        <p className="truncate text-xs text-gray-400">{currentSong.artist}</p>
      </div>
    </div>
  );
};

export default CurrentTrackInfo;