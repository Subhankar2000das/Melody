"use client";

import { usePlayerStore } from "@/store/player-store";
import type { ISong } from "@/typescript/interfaces/song.interface";
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
      className="cursor-pointer rounded-xl bg-[#181818] p-3 transition hover:bg-[#242424]"
    >
      <img
        src={song.image}
        alt={song.title}
        className="mb-2 h-28 w-full rounded-lg object-cover sm:h-36"
      />

      <p className="truncate text-sm font-semibold text-white">
        {song.title}
      </p>
      <p className="truncate text-xs text-gray-400">{song.artist}</p>

      <div
        className="mt-3 flex items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <LikeSongButton songId={song.id} />
        <AddToPlaylistButton songId={song.id} />
      </div>
    </div>
  );
};

export default SongCard;