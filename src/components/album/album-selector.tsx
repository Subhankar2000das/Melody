import type { IAlbum } from "@/typescript/interfaces/album.interface";

type Props = {
  albums: IAlbum[];
  value?: number | null;
  onChange: (value: number | null) => void;
  disabled?: boolean;
};

const AlbumSelector = ({ albums, value, onChange, disabled = false }: Props) => {
  return (
    <select
      value={value ?? ""}
      disabled={disabled}
      onChange={(e) => {
        const nextValue = e.target.value ? Number(e.target.value) : null;
        onChange(nextValue);
      }}
      className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white outline-none focus:border-emerald-500"
    >
      <option value="">No Album</option>
      {albums?.map((album) => (
        <option key={album.id} value={album.id}>
          {album.title} — {album.artist}
        </option>
      ))}
    </select>
  );
};

export default AlbumSelector;