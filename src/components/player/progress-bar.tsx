"use client";

import { useMemo } from "react";
import { usePlayerStore } from "@/store/player-store";

type Props = {
  onSeek: (time: number) => void;
};

const formatTime = (value: number) => {
  if (!Number.isFinite(value) || value < 0) return "0:00";

  const mins = Math.floor(value / 60);
  const secs = Math.floor(value % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const ProgressBar = ({ onSeek }: Props) => {
  const { currentTime, duration, currentSong } = usePlayerStore();

  const safeDuration = useMemo(() => {
    return Number.isFinite(duration) && duration > 0 ? duration : 0;
  }, [duration]);

  return (
    <div className="flex w-full items-center gap-3">
      <span className="w-10 text-right text-xs text-gray-400">
        {formatTime(currentTime)}
      </span>

      <input
        type="range"
        min={0}
        max={safeDuration || 0}
        step={1}
        value={Number.isFinite(currentTime) ? currentTime : 0}
        onChange={(e) => onSeek(Number(e.target.value))}
        disabled={!currentSong || !safeDuration}
        className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-700 accent-white disabled:opacity-40"
      />

      <span className="w-10 text-xs text-gray-400">
        {formatTime(safeDuration)}
      </span>
    </div>
  );
};

export default ProgressBar;