"use client";

import { useRouter } from "next/navigation";
import type { IAlbum } from "@/typescript/interfaces/album.interface";

type Props = {
  album: IAlbum;
};

const AlbumCard = ({ album }: Props) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/albums/${album.id}`)}
      className="cursor-pointer rounded-xl bg-[#181818] p-3 transition hover:bg-[#242424]"
    >
      <img
        src={album.image}
        alt={album.title}
        className="mb-2 h-28 w-full rounded-lg object-cover sm:h-36"
      />

      <p className="truncate text-sm font-semibold text-white">
        {album.title}
      </p>
      <p className="truncate text-xs text-gray-400">{album.artist}</p>
    </div>
  );
};

export default AlbumCard;