"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Header from "@/components/admin/header";
import SongsTable from "@/components/admin/songs-table";
import DeleteConfirmation from "@/components/admin/delete-confirmation";
import Button from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/ui/empty-state";

import { useSongsQuery } from "@/hooks/queries/useSongsQuery";
import { useDeleteSongMutation } from "@/hooks/mutations/useDeleteSongMutation";

import type { ISong } from "@/typescript/interfaces/song.interface";

const AdminSongsPage = () => {
  const router = useRouter();

  const { data: songs = [], isLoading } = useSongsQuery();
  const { mutateAsync, isPending } = useDeleteSongMutation();

  const [selectedSong, setSelectedSong] = useState<ISong | null>(null);
  const [keyword, setKeyword] = useState("");

  // 🔥 Filter logic
  const filteredSongs = useMemo(() => {
    const trimmed = keyword.trim().toLowerCase();

    if (!trimmed) return songs;

    return songs.filter((song) => {
      return (
        song.title.toLowerCase().includes(trimmed) ||
        song.artist.toLowerCase().includes(trimmed)
      );
    });
  }, [songs, keyword]);

  // 🔥 Delete handler
  const handleDelete = async () => {
    try {
      if (!selectedSong?.id) return;

      await mutateAsync(selectedSong.id);

      toast.success("Song deleted successfully");
      setSelectedSong(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete song"
      );
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <Header
        title="Songs"
        subtitle="Create, search, and manage songs."
        action={
          <Link href="/admin/songs/add">
            <Button>Add Song</Button>
          </Link>
        }
      />

      {/* 🔥 Search */}
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search songs by title or artist..."
        className="w-full rounded-xl border border-white/10 bg-[#181818] px-4 py-3 text-white outline-none placeholder:text-gray-400 focus:border-[#1db954]"
      />

      {/* 🔥 Table */}
      {filteredSongs.length ? (
        <SongsTable
          songs={filteredSongs}
          onEdit={(id) => router.push(`/admin/songs/edit/${id}`)}
          onDelete={(id) => {
            const song =
              filteredSongs.find((item) => item.id === id) ?? null;
            setSelectedSong(song);
          }}
        />
      ) : (
        <EmptyState message="No songs found." />
      )}

      {/* 🔥 Delete Modal */}
      <DeleteConfirmation
        open={!!selectedSong}
        title="Delete Song"
        description={`Are you sure you want to delete "${
          selectedSong?.title ?? ""
        }"?`}
        isLoading={isPending}
        onClose={() => setSelectedSong(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminSongsPage;