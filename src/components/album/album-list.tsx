import type { IAlbum } from "@/typescript/interfaces/album.interface";
import AlbumCard from "./album-card";

type Props = {
  albums: IAlbum[];
};

const AlbumList = ({ albums }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {albums?.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
};

export default AlbumList;