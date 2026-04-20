"use client";

import { useSearchParams } from "next/navigation";
import AlbumList from "@/components/album/album-list";
import EmptyState from "@/components/ui/empty-state";
import Loader from "@/components/ui/loader";
import { useAlbumsQuery } from "@/hooks/queries/useAlbumsQuery";

const AlbumsPageContent = () => {
  const searchParams = useSearchParams();
  const keyword = (searchParams.get("q") ?? "").trim().toLowerCase();

  const { data: albums = [], isLoading } = useAlbumsQuery();

  if (isLoading) {
    return <Loader />;
  }

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

export default AlbumsPageContent;