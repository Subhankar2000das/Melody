"use client";

import { useParams } from "next/navigation";

import Header from "@/components/admin/header";
import AttachSongsForm from "@/components/forms/attach-songs-form";
import BackButton from "@/components/ui/back-button";
import EmptyState from "@/components/ui/empty-state";

const AttachSongsPage = () => {
  const params = useParams();
  const rawId = params?.id;
  const albumId = Number(Array.isArray(rawId) ? rawId[0] : rawId);

  if (!Number.isFinite(albumId)) {
    return <EmptyState message="Invalid album id." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Header
          title="Attach Songs"
          subtitle="Attach songs to this album."
        />
        <BackButton />
      </div>

      <AttachSongsForm albumId={albumId} />
    </div>
  );
};

export default AttachSongsPage;