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
      className="group cursor-pointer rounded-xl bg-[#181818] p-4 transition hover:bg-[#242424]"
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={album.image}
          alt={album.title}
          className="h-44 w-full rounded-lg object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-4">
        <h3 className="truncate text-base font-semibold text-white">
          {album.title}
        </h3>
        <p className="truncate text-sm text-gray-400">{album.artist}</p>
      </div>
    </div>
  );
};

export default AlbumCard;