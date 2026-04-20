"use client";

import SectionTitle from "@/components/ui/section-title";
import SongList from "@/components/songs/song-list";
import AlbumList from "@/components/album/album-list";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/ui/empty-state";
import { useSongsQuery } from "@/hooks/queries/useSongsQuery";
import { useAlbumsQuery } from "@/hooks/queries/useAlbumsQuery";
import { usePlayerStore } from "@/store/player-store";

const HomePage = () => {
  const { data: songs = [], isLoading: songsLoading } = useSongsQuery();
  const { data: albums = [], isLoading: albumsLoading } = useAlbumsQuery();
  const { recentlyPlayed } = usePlayerStore();

  if (songsLoading || albumsLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-10">
      {recentlyPlayed.length ? (
        <section>
          <SectionTitle title="Recently Played" />
          <SongList songs={recentlyPlayed} />
        </section>
      ) : null}

      <section>
        <SectionTitle title="Trending Songs" />
        {songs.length ? (
          <SongList songs={songs.slice(0, 12)} />
        ) : (
          <EmptyState message="No songs found." />
        )}
      </section>

      <section>
        <SectionTitle title="Popular Albums" />
        {albums.length ? (
          <AlbumList albums={albums} />
        ) : (
          <EmptyState message="No albums found." />
        )}
      </section>
    </div>
  );
};

export default HomePage;