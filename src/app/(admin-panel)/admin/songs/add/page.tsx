import Header from "@/components/admin/header";
import SongForm from "@/components/forms/song-form";
import BackButton from "@/components/ui/back-button";

const AddSongPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Header
          title="Add Song"
          subtitle="Upload a new song with cover image and metadata."
        />
        <BackButton />
      </div>

      <SongForm />
    </div>
  );
};

export default AddSongPage;