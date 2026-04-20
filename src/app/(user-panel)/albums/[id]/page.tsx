"use client";

import { useParams } from "next/navigation";
import AlbumHero from "@/components/album/album-hero";
import AlbumSongList from "@/components/album/album-song-list";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/ui/empty-state";
import { useAlbumById } from "@/hooks/queries/useAlbumById";
import { useSongsByAlbum } from "@/hooks/queries/useSongsByAlbum";

const AlbumDetailsPage = () => {
  const params = useParams();
  const rawId = params?.id;
  const albumId = Number(Array.isArray(rawId) ? rawId[0] : rawId);

  const { data: album, isLoading: albumLoading } = useAlbumById(
    Number.isFinite(albumId) ? albumId : undefined
  );
  const { data: songs = [], isLoading: songsLoading } = useSongsByAlbum(
    Number.isFinite(albumId) ? albumId : undefined
  );

  if (!Number.isFinite(albumId)) {
    return <EmptyState message="Invalid album id." />;
  }

  if (albumLoading || songsLoading) {
    return <Loader />;
  }

  if (!album) {
    return <EmptyState message="Album not found." />;
  }

  return (
    <div className="space-y-6">
      <AlbumHero album={album} songsCount={songs.length} />
      {songs.length ? (
        <AlbumSongList songs={songs} />
      ) : (
        <EmptyState message="No songs attached to this album." />
      )}
    </div>
  );
};

export default AlbumDetailsPage;