"use client";

import SectionTitle from "@/components/ui/section-title";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/ui/empty-state";
import SongList from "@/components/songs/song-list";
import { useSongsByCategory } from "@/hooks/queries/useSongsByCategory";

type Props = {
  params: {
    category: string;
  };
};

const CategorySongsPage = ({ params }: Props) => {
  const { data: songs = [], isLoading } = useSongsByCategory(params.category);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <SectionTitle title={`${params.category} Songs`} />
      {songs?.length ? (
        <SongList songs={songs} />
      ) : (
        <EmptyState message="No songs found in this category." />
      )}
    </div>
  );
};

export default CategorySongsPage;