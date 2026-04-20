import SongList from "./song-list";
import { ISong } from "@/typescript/interfaces/song.interface";

const CategorySection = ({
  title,
  songs,
}: {
  title: string;
  songs: ISong[];
}) => {
  return (
    <div>
      <h2 className="text-white text-xl mb-4">{title}</h2>
      <SongList songs={songs} />
    </div>
  );
};

export default CategorySection;