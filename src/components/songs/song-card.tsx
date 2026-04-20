"use client";

import type { ISong } from "@/typescript/interfaces/song.interface";
import { usePlayerStore } from "@/store/player-store";
import LikeSongButton from "./like-song-button";
import AddToPlaylistButton from "./add-to-playlist-button";

type Props = {
  song: ISong;
  songs?: ISong[];
};

const SongCard = ({ song, songs = [] }: Props) => {
  const { play } = usePlayerStore();

  return (
    <div
      onClick={() => play(song, songs)}
      className="group cursor-pointer rounded-xl bg-[#181818] p-4 transition hover:bg-[#242424]"
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={song.image}
          alt={song.title}
          className="h-40 w-full rounded-lg object-cover transition duration-300 group-hover:scale-105"
        />

        <button
          type="button"
          className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#1db954] text-black opacity-0 shadow-lg transition group-hover:opacity-100"
        >
          ▶
        </button>
      </div>

      <div className="mt-4">
        <h3 className="truncate text-sm font-semibold text-white">
          {song.title}
        </h3>
        <p className="mt-1 truncate text-xs text-gray-400">{song.artist}</p>

        <div
          className="mt-3 flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <LikeSongButton songId={song.id} />
          <AddToPlaylistButton songId={song.id} />
        </div>
      </div>
    </div>
  );
};

export default SongCard;