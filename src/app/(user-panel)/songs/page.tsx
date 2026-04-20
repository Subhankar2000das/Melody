"use client";

import { useState } from "react";
import SectionTitle from "@/components/ui/section-title";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/ui/empty-state";
import SongList from "@/components/songs/song-list";
import SongFilterTabs from "@/components/songs/song-filter-tabs";
import { useSongsQuery } from "@/hooks/queries/useSongsQuery";

const SongsPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const { data: songs = [], isLoading } = useSongsQuery();

  const filteredSongs =
    activeTab === "All"
      ? songs
      : songs.filter((song) => song.category === activeTab);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <SectionTitle title="All Songs" />
      <SongFilterTabs active={activeTab} onChange={setActiveTab} />
      {filteredSongs?.length ? (
        <SongList songs={filteredSongs} />
      ) : (
        <EmptyState message="No songs found." />
      )}
    </div>
  );
};

export default SongsPage;