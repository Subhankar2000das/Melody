import Header from "@/components/admin/header";
import AlbumForm from "@/components/forms/album-form";
import BackButton from "@/components/ui/back-button";

const AddAlbumPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Header
          title="Add Album"
          subtitle="Create a new album with cover image."
        />
        <BackButton />
      </div>

      <AlbumForm />
    </div>
  );
};

export default AddAlbumPage;