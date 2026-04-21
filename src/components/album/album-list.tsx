"use client";

import AlbumCard from "./album-card";
import EmptyState from "@/components/ui/empty-state";
import type { IAlbum } from "@/typescript/interfaces/album.interface";

type Props = {
  albums?: IAlbum[];
};

const AlbumList = ({ albums = [] }: Props) => {
  if (!albums.length) {
    return <EmptyState message="No albums found." />;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
};

export default AlbumList;