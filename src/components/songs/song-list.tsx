"use client";

import SongCard from "./song-card";
import EmptyState from "@/components/ui/empty-state";
import type { ISong } from "@/typescript/interfaces/song.interface";

type Props = {
  songs?: ISong[];
};

const SongList = ({ songs = [] }: Props) => {
  if (!songs.length) {
    return <EmptyState message="No songs available." />;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {songs.map((song) => (
        <SongCard key={song.id} song={song} />
      ))}
    </div>
  );
};

export default SongList;