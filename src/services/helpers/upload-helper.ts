import { storageBuckets } from "@/lib/supabase/storage";
import { getPublicFileName } from "@/lib/utils";

export const uploadFile = async (
  bucket: "songs-file" | "songs-image" | "album-image",
  file: File
) => {
  const fileName = getPublicFileName(file.name);

  const bucketMap = {
    "songs-file": storageBuckets.songsFile,
    "songs-image": storageBuckets.songsImage,
    "album-image": storageBuckets.albumsImage,
  };

  const bucketRef = bucketMap[bucket];

  const { error } = await bucketRef.upload(fileName, file);

  if (error) throw new Error(error.message);

  const { data } = bucketRef.getPublicUrl(fileName);

  return data?.publicUrl;
};
