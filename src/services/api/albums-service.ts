import { supabase } from "@/lib/supabase/client";
import { db } from "@/lib/supabase/database";
import { storageBuckets } from "@/lib/supabase/storage";
import { uploadFile } from "@/services/helpers/upload-helper";
import type {
  ICreateAlbumPayload,
  IUpdateAlbumPayload,
} from "@/typescript/interfaces/album.interface";

const getStoragePathFromUrl = (url?: string | null) => {
  if (!url) return null;

  try {
    const parts = url.split("/object/public/");
    const pathWithBucket = parts[1];

    if (!pathWithBucket) return null;

    const pathParts = pathWithBucket.split("/");
    if (!pathParts.length) return null;

    pathParts.shift();
    return pathParts.join("/");
  } catch {
    return null;
  }
};

export const getAlbums = async () => {
  const { data, error } = await db.albums().select("*").order("created_at", {
    ascending: false,
  });

  if (error) throw new Error(error.message);

  return data ?? [];
};

export const getAlbumById = async (id: number) => {
  const { data, error } = await db.albums().select("*").eq("id", id).single();

  if (error) throw new Error(error.message);

  return data;
};

export const addAlbum = async (
  payload: Omit<ICreateAlbumPayload, "image">,
  imageFile: File
) => {
  const imageUrl = await uploadFile("album-image", imageFile);

  const { data, error } = await db
    .albums()
    .insert({ ...payload, image: imageUrl })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const updateAlbum = async (
  payload: IUpdateAlbumPayload,
  imageFile?: File | null
) => {
  const { id, ...rest } = payload;

  const { data: existingAlbum, error: fetchError } = await db
    .albums()
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  let nextImageUrl = rest.image ?? existingAlbum.image;

  if (imageFile) {
    const oldImagePath = getStoragePathFromUrl(existingAlbum.image);
    if (oldImagePath) {
      await storageBuckets.albumsImage.remove([oldImagePath]);
    }

    nextImageUrl = await uploadFile("album-image", imageFile);
  }

  const { data, error } = await db
    .albums()
    .update({
      title: rest.title,
      artist: rest.artist,
      image: nextImageUrl,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const deleteAlbum = async (albumId: number) => {
  const { data: existingAlbum, error: fetchError } = await db
    .albums()
    .select("*")
    .eq("id", albumId)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  const imagePath = getStoragePathFromUrl(existingAlbum.image);

  if (imagePath) {
    await storageBuckets.albumsImage.remove([imagePath]);
  }

  const { error } = await db.albums().delete().eq("id", albumId);

  if (error) throw new Error(error.message);

  return true;
};

export const attachSongsToAlbum = async (albumId: number, songIds: number[]) => {
  const rows = songIds.map((songId) => ({
    album_id: albumId,
    song_id: songId,
  }));

  const { error } = await supabase.from("album_songs").insert(rows);

  if (error) throw new Error(error.message);

  return true;
};

export const detachSongFromAlbum = async (songId: number, albumId: number) => {
  const { error } = await supabase
    .from("album_songs")
    .delete()
    .eq("song_id", songId)
    .eq("album_id", albumId);

  if (error) throw new Error(error.message);

  return true;
};