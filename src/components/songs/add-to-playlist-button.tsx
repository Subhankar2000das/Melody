"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { usePlaylistsQuery } from "@/hooks/queries/usePlaylistsQuery";
import { useAddSongToPlaylistMutation } from "@/hooks/mutations/useAddSongToPlaylistMutation";

type Props = {
  songId: number;
};

const AddToPlaylistButton = ({ songId }: Props) => {
  const [open, setOpen] = useState(false);
  const [playlistId, setPlaylistId] = useState("");

  const { authUser } = useAuthStore();
  const { data: playlists = [] } = usePlaylistsQuery(authUser?.id);
  const { mutateAsync, isPending } = useAddSongToPlaylistMutation();

  const handleAdd = async () => {
    if (!authUser?.id) {
      toast.error("Please login first");
      return;
    }

    if (!playlistId) {
      toast.error("Select a playlist");
      return;
    }

    try {
      await mutateAsync({
        playlistId: Number(playlistId),
        songId,
      });

      toast.success("Song added to playlist");
      setPlaylistId("");
      setOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add song");
    }
  };

  if (!authUser?.id || !playlists.length) {
    return null;
  }

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
        >
          <Plus className="h-4 w-4 text-white" />
        </button>
      ) : (
        <div className="absolute right-0 top-10 z-50 w-56 rounded-2xl border border-white/10 bg-[#181818] p-3 shadow-2xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-white">Add to Playlist</p>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setPlaylistId("");
              }}
              className="rounded-full p-1 text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <select
            value={playlistId}
            onChange={(e) => setPlaylistId(e.target.value)}
            className="mb-3 w-full rounded-lg border border-white/10 bg-[#111] px-3 py-2 text-sm text-white outline-none"
          >
            <option value="">Select playlist</option>
            {playlists.map((playlist) => (
              <option key={playlist.id} value={playlist.id}>
                {playlist.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleAdd}
            disabled={isPending}
            className="w-full rounded-lg bg-[#1db954] px-3 py-2 text-sm font-medium text-black transition hover:bg-[#1ed760]"
          >
            {isPending ? "Adding..." : "Add"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToPlaylistButton;