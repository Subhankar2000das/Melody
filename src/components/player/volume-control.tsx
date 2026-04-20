"use client";

import { usePlayerStore } from "@/store/player-store";

const VolumeControl = () => {
  const { volume, setVolume } = usePlayerStore();

  return (
    <div className="flex min-w-[160px] items-center justify-end gap-3">
      <span className="text-sm text-gray-400">🔊</span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className="h-1 w-28 cursor-pointer appearance-none rounded-lg bg-gray-700 accent-white"
      />
    </div>
  );
};

export default VolumeControl;