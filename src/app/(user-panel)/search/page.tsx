import SongList from "@/components/songs/song-list";
import AlbumList from "@/components/album/album-list";
import SectionTitle from "@/components/ui/section-title";
import EmptyState from "@/components/ui/empty-state";
import { getSongs } from "@/services/api/songs-service";
import { getAlbums } from "@/services/api/albums-service";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

const SearchPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const keyword = (params.q ?? "").trim().toLowerCase();

  const [songs, albums] = await Promise.all([getSongs(), getAlbums()]);

  const filteredSongs = keyword
    ? songs.filter(
        (song) =>
          song.title.toLowerCase().includes(keyword) ||
          song.artist.toLowerCase().includes(keyword) ||
          song.category?.toLowerCase().includes(keyword)
      )
    : [];

  const filteredAlbums = keyword
    ? albums.filter(
        (album) =>
          album.title.toLowerCase().includes(keyword) ||
          album.artist.toLowerCase().includes(keyword)
      )
    : [];

  return (
    <div className="space-y-8">
      <SectionTitle title={`Search results for "${params.q ?? ""}"`} />

      {!keyword ? (
        <EmptyState message="Start typing in the navbar search to find songs or albums." />
      ) : (
        <>
          <section className="space-y-4">
            <SectionTitle title="Songs" />
            {filteredSongs.length ? (
              <SongList songs={filteredSongs} />
            ) : (
              <EmptyState message="No songs found." />
            )}
          </section>

          <section className="space-y-4">
            <SectionTitle title="Albums" />
            {filteredAlbums.length ? (
              <AlbumList albums={filteredAlbums} />
            ) : (
              <EmptyState message="No albums found." />
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default SearchPage;