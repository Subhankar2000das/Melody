"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Header from "@/components/admin/header";
import AlbumsTable from "@/components/admin/albums-table";
import DeleteConfirmation from "@/components/admin/delete-confirmation";
import Button from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/ui/empty-state";
import { useAlbumsQuery } from "@/hooks/queries/useAlbumsQuery";
import { useDeleteAlbumMutation } from "@/hooks/mutations/useDeleteAlbumMutation";
import type { IAlbum } from "@/typescript/interfaces/album.interface";

const AdminAlbumsPage = () => {
  const router = useRouter();

  const { data: albums = [], isLoading } = useAlbumsQuery();
  const { mutateAsync, isPending } = useDeleteAlbumMutation();

  const [selectedAlbum, setSelectedAlbum] = useState<IAlbum | null>(null);
  const [keyword, setKeyword] = useState("");

  const filteredAlbums = useMemo(() => {
    const trimmed = keyword.trim().toLowerCase();

    if (!trimmed) return albums;

    return albums.filter((album) => {
      return (
        album.title.toLowerCase().includes(trimmed) ||
        album.artist.toLowerCase().includes(trimmed)
      );
    });
  }, [albums, keyword]);

  const handleDelete = async () => {
    try {
      if (!selectedAlbum?.id) return;
      await mutateAsync(selectedAlbum.id);
      toast.success("Album deleted successfully");
      setSelectedAlbum(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete album");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <Header
        title="Albums"
        subtitle="Create, search, and manage albums."
        action={
          <Link href="/admin/albums/add">
            <Button>Add Album</Button>
          </Link>
        }
      />

      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search albums by title or artist..."
        className="w-full rounded-xl border border-white/10 bg-[#181818] px-4 py-3 text-white outline-none placeholder:text-gray-400 focus:border-[#1db954]"
      />

      {filteredAlbums.length ? (
        <AlbumsTable
          albums={filteredAlbums}
          onEdit={(id) => router.push(`/admin/albums/edit/${id}`)}
          onAttachSongs={(id) => router.push(`/admin/albums/attach-songs/${id}`)}
          onDelete={(id) => {
            const album = filteredAlbums.find((item) => item.id === id) ?? null;
            setSelectedAlbum(album);
          }}
        />
      ) : (
        <EmptyState message="No albums found." />
      )}

      <DeleteConfirmation
        open={!!selectedAlbum}
        title="Delete Album"
        description={`Are you sure you want to delete "${selectedAlbum?.title ?? ""}"?`}
        isLoading={isPending}
        onClose={() => setSelectedAlbum(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminAlbumsPage;