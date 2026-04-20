import type { IAlbum } from "@/typescript/interfaces/album.interface";

type Props = {
  album: IAlbum;
  songsCount?: number;
};

const AlbumHero = ({ album, songsCount = 0 }: Props) => {
  return (
    <div className="rounded-2xl bg-gradient-to-b from-emerald-700/60 via-emerald-900/30 to-[#121212] p-6 md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end">
        <img
          src={album.image}
          alt={album.title}
          className="h-48 w-48 rounded-xl object-cover shadow-2xl md:h-56 md:w-56"
        />

        <div className="text-white">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-300">
            Album
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-5xl">{album.title}</h1>
          <p className="mt-3 text-sm text-gray-300 md:text-base">
            {album.artist} • {songsCount} song{songsCount === 1 ? "" : "s"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlbumHero;