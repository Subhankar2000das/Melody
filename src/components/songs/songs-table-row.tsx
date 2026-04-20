import { ISong } from "@/typescript/interfaces/song.interface";

const SongsTableRow = ({ song }: { song: ISong }) => {
  return (
    <tr className="border-b border-gray-800">
      <td className="p-3">{song.title}</td>
      <td className="p-3">{song.artist}</td>
      <td className="p-3">{song.year}</td>
      <td className="p-3">{song.category}</td>
    </tr>
  );
};

export default SongsTableRow;