"use client";

import { useMemo } from "react";
import ProtectedRoute from "@/components/auth/protected-route";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/ui/empty-state";
import Button from "@/components/ui/button";
import SongRow from "@/components/songs/song-row";
import { useAuthStore } from "@/store/auth-store";
import { useLikedSongsQuery } from "@/hooks/queries/useLikedSongsQuery";
import { usePlayerStore } from "@/store/player-store";

const LikedSongsContent = () => {
  const { authUser } = useAuthStore();
  const { playQueue } = usePlayerStore();
  const { data = [], isLoading } = useLikedSongsQuery(authUser?.id);

  const songs = useMemo(
    () => data.map((item) => item.song).filter(Boolean),
    [data]
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-b from-purple-700 via-purple-900 to-[#121212] p-8 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
          Playlist
        </p>
        <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">
          Liked Songs
        </h1>
        <p className="mt-4 text-sm text-white/80">
          {songs.length} song{songs.length === 1 ? "" : "s"}
        </p>

        <div className="mt-8">
          <Button
            type="button"
            onClick={() => playQueue(songs)}
            disabled={!songs.length}
            className="min-w-[140px]"
          >
            ▶ Play All
          </Button>
        </div>
      </div>

      {songs.length ? (
        <div className="space-y-3 rounded-2xl border border-white/10 bg-[#181818] p-4">
          {songs.map((song) => (
            <SongRow key={song.id} song={song} songs={songs} showActions />
          ))}
        </div>
      ) : (
        <EmptyState message="No liked songs yet." />
      )}
    </div>
  );
};

const Page = () => {
  return (
    <ProtectedRoute>
      <LikedSongsContent />
    </ProtectedRoute>
  );
};

export default Page;