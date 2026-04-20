"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import ProtectedRoute from "@/components/auth/protected-route";
import SectionTitle from "@/components/ui/section-title";
import EmptyState from "@/components/ui/empty-state";
import Loader from "@/components/ui/loader";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import CreatePlaylistForm from "@/components/forms/create-playlist-form";
import SongRow from "@/components/songs/song-row";

import { useAuthStore } from "@/store/auth-store";
import { usePlaylistsQuery } from "@/hooks/queries/usePlaylistsQuery";
import { usePlaylistSongsQuery } from "@/hooks/queries/usePlaylistSongsQuery";
import { useSongsQuery } from "@/hooks/queries/useSongsQuery";
import { useDeletePlaylistMutation } from "@/hooks/mutations/useDeletePlaylistMutation";
import { useAddSongToPlaylistMutation } from "@/hooks/mutations/useAddSongToPlaylistMutation";
import { useRemoveSongFromPlaylistMutation } from "@/hooks/mutations/useRemoveSongFromPlaylistMutation";

const MyLibraryContent = () => {
  const { authUser } = useAuthStore();

  const { data: playlists = [], isLoading: playlistsLoading } = usePlaylistsQuery(
    authUser?.id
  );
  const { data: allSongs = [], isLoading: allSongsLoading } = useSongsQuery();

  const { mutateAsync: deletePlaylist, isPending: deletingPlaylist } =
    useDeletePlaylistMutation();
  const { mutateAsync: addSongToPlaylist, isPending: addingSong } =
    useAddSongToPlaylistMutation();
  const { mutateAsync: removeSongFromPlaylist, isPending: removingSong } =
    useRemoveSongFromPlaylistMutation();

  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const { data: playlistSongs = [], isLoading: playlistSongsLoading } =
    usePlaylistSongsQuery(selectedPlaylistId ?? undefined);

  const selectedPlaylist = playlists.find(
    (playlist) => playlist.id === selectedPlaylistId
  );

  const currentPlaylistSongs = useMemo(
    () => playlistSongs.map((item) => item.song).filter(Boolean),
    [playlistSongs]
  );

  const currentPlaylistSongIds = useMemo(
    () => new Set(currentPlaylistSongs.map((song) => song.id)),
    [currentPlaylistSongs]
  );

  const filteredAvailableSongs = useMemo(() => {
    const trimmed = searchKeyword.trim().toLowerCase();

    return allSongs.filter((song) => {
      const notInPlaylist = !currentPlaylistSongIds.has(song.id);

      const matchesSearch =
        !trimmed ||
        song.title.toLowerCase().includes(trimmed) ||
        song.artist.toLowerCase().includes(trimmed) ||
        song.category.toLowerCase().includes(trimmed);

      return notInPlaylist && matchesSearch;
    });
  }, [allSongs, currentPlaylistSongIds, searchKeyword]);

  const handleDeletePlaylist = async (playlistId: number) => {
    if (!authUser?.id) return;

    try {
      await deletePlaylist({
        playlistId,
        userId: authUser.id,
      });

      toast.success("Playlist deleted successfully");

      if (selectedPlaylistId === playlistId) {
        setSelectedPlaylistId(null);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete playlist");
    }
  };

  const handleAddSong = async (songId: number) => {
    if (!selectedPlaylistId) {
      toast.error("Select a playlist first");
      return;
    }

    try {
      await addSongToPlaylist({
        playlistId: selectedPlaylistId,
        songId,
      });

      toast.success("Song added to playlist");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add song");
    }
  };

  const handleRemoveSong = async (songId: number) => {
    if (!selectedPlaylistId) return;

    try {
      await removeSongFromPlaylist({
        playlistId: selectedPlaylistId,
        songId,
      });

      toast.success("Song removed from playlist");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to remove song");
    }
  };

  if (playlistsLoading || allSongsLoading) {
    return <Loader />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-[320px_1fr]">
      <div className="space-y-6">
        <SectionTitle title="My Library" />
        <CreatePlaylistForm />

        <div className="space-y-3">
          {playlists.length ? (
            playlists.map((playlist) => (
              <div
                key={playlist.id}
                className={`rounded-2xl border p-4 transition ${
                  selectedPlaylistId === playlist.id
                    ? "border-[#1db954] bg-[#1a1a1a]"
                    : "border-white/10 bg-[#181818]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedPlaylistId(playlist.id)}
                  className="w-full text-left"
                >
                  <p className="font-medium text-white">{playlist.name}</p>
                </button>

                <div className="mt-4">
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleDeletePlaylist(playlist.id)}
                    disabled={deletingPlaylist}
                  >
                    Delete Playlist
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <EmptyState message="No playlists yet." />
          )}
        </div>
      </div>

      <div className="space-y-6">
        <SectionTitle title={selectedPlaylist?.name ?? "Playlist Details"} />

        {!selectedPlaylistId ? (
          <EmptyState message="Select a playlist to manage songs." />
        ) : playlistSongsLoading ? (
          <Loader />
        ) : (
          <>
            <div className="rounded-2xl border border-white/10 bg-[#181818] p-4">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Songs in Playlist
              </h3>

              {currentPlaylistSongs.length ? (
                <div className="space-y-3">
                  {currentPlaylistSongs.map((song) => (
                    <div
                      key={song.id}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <SongRow song={song} songs={currentPlaylistSongs} />
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

            <div className="rounded-2xl border border-white/10 bg-[#181818] p-4">
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h3 className="text-lg font-semibold text-white">
                  Add Songs to Playlist
                </h3>

                <div className="w-full max-w-md">
                  <Input
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="Search songs to add..."
                  />
                </div>
              </div>

              {filteredAvailableSongs.length ? (
                <div className="space-y-3">
                  {filteredAvailableSongs.map((song) => (
                    <div
                      key={song.id}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <SongRow song={song} songs={allSongs} />
                      </div>

                      <Button
                        type="button"
                        onClick={() => handleAddSong(song.id)}
                        disabled={addingSong}
                      >
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState message="No available songs to add." />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <ProtectedRoute>
      <MyLibraryContent />
    </ProtectedRoute>
  );
};

export default Page;