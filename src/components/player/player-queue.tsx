"use client";

import { usePlayerStore } from "@/store/player-store";

const PlayerQueue = () => {
  const { queue } = usePlayerStore();

  return (
    <div className="p-4 text-white">
      <h3 className="mb-2">Queue</h3>

      {queue.map((song) => (
        <p key={song.id}>{song.title}</p>
      ))}
    </div>
  );
};

export default PlayerQueue;