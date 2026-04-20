import AlbumList from "@/components/album/album-list";
import EmptyState from "@/components/ui/empty-state";
import { getAlbums } from "@/services/api/albums-service";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

const Page = async ({ searchParams }: Props) => {
  const { q = "" } = await searchParams;
  const keyword = q.trim().toLowerCase();

  const albums = await getAlbums();

  const filteredAlbums = keyword
    ? albums.filter(
        (album) =>
          album.title.toLowerCase().includes(keyword) ||
          album.artist.toLowerCase().includes(keyword)
      )
    : albums;

  return filteredAlbums.length ? (
    <AlbumList albums={filteredAlbums} />
  ) : (
    <EmptyState message="No albums found." />
  );
};

export default Page;