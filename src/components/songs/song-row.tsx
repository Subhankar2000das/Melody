"use client";

import { usePlayerStore } from "@/store/player-store";
import type { ISong } from "@/typescript/interfaces/song.interface";
import LikeSongButton from "./like-song-button";
import AddToPlaylistButton from "./add-to-playlist-button";

type Props = {
  song: ISong;
  songs?: ISong[];
  showActions?: boolean;
};

const SongRow = ({ song, songs = [], showActions = true }: Props) => {
  const { play } = usePlayerStore();

  return (
    <div
      onClick={() => play(song, songs)}
      className="flex items-center justify-between gap-4 rounded-xl p-3 transition hover:bg-white/5 cursor-pointer"
    >
      <div className="flex min-w-0 items-center gap-3">
        <img
          src={song.image}
          alt={song.title}
          className="h-12 w-12 rounded object-cover"
        />

        <div className="min-w-0">
          <p className="truncate text-white">{song.title}</p>
          <p className="truncate text-sm text-gray-400">{song.artist}</p>
        </div>
      </div>

      {showActions ? (
        <div
          className="flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <LikeSongButton songId={song.id} />
          <AddToPlaylistButton songId={song.id} />
        </div>
      ) : null}
    </div>
  );
};

export default SongRow;