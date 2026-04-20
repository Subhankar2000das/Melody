import SongCard from "./song-card";
import { ISong } from "@/typescript/interfaces/song.interface";

const SongList = ({ songs }: { songs: ISong[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {songs.map((song) => (
        <SongCard key={song.id} song={song} songs={songs} />
      ))}
    </div>
  );
};

export default SongList;