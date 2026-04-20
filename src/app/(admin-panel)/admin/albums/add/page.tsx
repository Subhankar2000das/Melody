import Header from "@/components/admin/header";
import AlbumForm from "@/components/forms/album-form";


const AddAlbumPage = () => {
  return (
    <div className="space-y-6">
      <Header
        title="Add Album"
        subtitle="Create a new album with cover image."
      />
      <AlbumForm />
    </div>
  );
};

export default AddAlbumPage;