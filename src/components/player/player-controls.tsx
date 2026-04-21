"use client";

import { usePlayerStore } from "@/store/player-store";

const PlayerControls = () => {
  const { isPlaying, toggle, next, prev, currentSong } = usePlayerStore();

  return (
    <div className="flex items-center justify-center gap-4 text-white">
      <button
        type="button"
        onClick={prev}
        disabled={!currentSong}
        className="text-lg text-gray-300 transition hover:text-white disabled:opacity-40"
      >
        ⏮
      </button>

      <button
        type="button"
        onClick={toggle}
        disabled={!currentSong}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:scale-105 disabled:opacity-40"
      >
        {isPlaying ? "⏸" : "▶"}
      </button>

      <button
        type="button"
        onClick={next}
        disabled={!currentSong}
        className="text-lg text-gray-300 transition hover:text-white disabled:opacity-40"
      >
        ⏭
      </button>
    </div>
  );
};

export default PlayerControls;