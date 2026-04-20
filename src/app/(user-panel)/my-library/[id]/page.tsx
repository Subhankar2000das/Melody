"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import ProtectedRoute from "@/components/auth/protected-route";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/ui/empty-state";
import Button from "@/components/ui/button";
import SongRow from "@/components/songs/song-row";
import { usePlaylistsQuery } from "@/hooks/queries/usePlaylistsQuery";
import { usePlaylistSongsQuery } from "@/hooks/queries/usePlaylistSongsQuery";
import { useRemoveSongFromPlaylistMutation } from "@/hooks/mutations/useRemoveSongFromPlaylistMutation";
import { useDeletePlaylistMutation } from "@/hooks/mutations/useDeletePlaylistMutation";
import { useAuthStore } from "@/store/auth-store";
import { usePlayerStore } from "@/store/player-store";

const PlaylistDetailsContent = () => {
  const params = useParams();
  const router = useRouter();
  const { authUser } = useAuthStore();
  const { playQueue } = usePlayerStore();
  const { mutateAsync: removeSong, isPending: removingSong } =
    useRemoveSongFromPlaylistMutation();
  const { mutateAsync: deletePlaylist, isPending: deletingPlaylist } =
    useDeletePlaylistMutation();

  const rawId = params?.id;
  const playlistId = Number(Array.isArray(rawId) ? rawId[0] : rawId);

  const { data: playlists = [], isLoading: playlistsLoading } = usePlaylistsQuery(authUser?.id);
  const { data: playlistSongs = [], isLoading: songsLoading } =
    usePlaylistSongsQuery(Number.isFinite(playlistId) ? playlistId : undefined);

  const playlist = playlists.find((item) => item.id === playlistId);

  const songs = useMemo(
    () => playlistSongs.map((item) => item.song).filter(Boolean),
    [playlistSongs]
  );

  const handleRemoveSong = async (songId: number) => {
    try {
      await removeSong({
        playlistId,
        songId,
      });

      toast.success("Song removed from playlist");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to remove song");
    }
  };

  const handleDeletePlaylist = async () => {
    if (!authUser?.id) return;

    try {
      await deletePlaylist({
        playlistId,
        userId: authUser.id,
      });

      toast.success("Playlist deleted successfully");
      router.push("/my-library");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete playlist");
    }
  };

  if (!Number.isFinite(playlistId)) {
    return <EmptyState message="Invalid playlist id." />;
  }

  if (playlistsLoading || songsLoading) {
    return <Loader />;
  }

  if (!playlist) {
    return <EmptyState message="Playlist not found." />;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-b from-emerald-700 via-emerald-900 to-[#121212] p-8 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
          Playlist
        </p>
        <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">
          {playlist.name}
        </h1>
        <p className="mt-4 text-sm text-white/80">
          {songs.length} song{songs.length === 1 ? "" : "s"}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={() => playQueue(songs)}
            disabled={!songs.length}
            className="min-w-[140px]"
          >
            ▶ Play All
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={handleDeletePlaylist}
            disabled={deletingPlaylist}
          >
            {deletingPlaylist ? "Deleting..." : "Delete Playlist"}
          </Button>
        </div>
      </div>

      {songs.length ? (
        <div className="space-y-3 rounded-2xl border border-white/10 bg-[#181818] p-4">
          {songs.map((song) => (
            <div
              key={song.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex-1">
                <SongRow song={song} songs={songs} showActions />
              </div>

              <Button
                type="button"
                variant="danger"
                onClick={() => handleRemoveSong(song.id)}
                disabled={removingSong}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message="No songs in this playlist yet." />
      )}
    </div>
  );
};

const Page = () => {
  return (
    <ProtectedRoute>
      <PlaylistDetailsContent />
    </ProtectedRoute>
  );
};

export default Page;