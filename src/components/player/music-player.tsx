"use client";

import { useAudio } from "@/hooks/player/useAudio";
import CurrentTrackInfo from "./current-track-info";
import PlayerControls from "./player-controls";
import ProgressBar from "./progress-bar";
import VolumeControl from "./volume-control";

const MusicPlayer = () => {
  const { seek } = useAudio();
  

  return (
    <div className="grid h-24 grid-cols-[240px_1fr_180px] items-center gap-6 bg-[#121212] px-4">
      <CurrentTrackInfo />

      <div className="flex flex-col items-center justify-center gap-2">
        <PlayerControls />
        <div className="w-full max-w-2xl">
          <ProgressBar onSeek={seek} />
        </div>
      </div>

      <VolumeControl />
    </div>
  );
};

export default MusicPlayer;