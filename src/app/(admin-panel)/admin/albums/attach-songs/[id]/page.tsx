"use client";

import { useParams } from "next/navigation";
import Header from "@/components/admin/header";
import AttachSongsForm from "@/components/forms/attach-songs-form";
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
      <Header
        title="Attach Songs"
        subtitle="Select multiple songs and attach them to this album."
      />
      <AttachSongsForm albumId={albumId} />
    </div>
  );
};

export default AttachSongsPage;