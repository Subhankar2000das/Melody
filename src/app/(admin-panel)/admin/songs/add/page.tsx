"use client";

import Header from "@/components/admin/header";
import SongForm from "@/components/forms/song-form";

const AddSongPage = () => {
  return (
    <div className="space-y-6">
      <Header
        title="Add Song"
        subtitle="Upload a new song with cover image and metadata."
      />
      <SongForm />
    </div>
  );
};

export default AddSongPage;