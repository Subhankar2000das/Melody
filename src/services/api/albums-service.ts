import { db } from "@/lib/supabase/database";
import { uploadFile } from "../helpers/upload-helper";
import type {
  ICreateAlbumPayload,
  IUpdateAlbumPayload,
} from "@/typescript/interfaces/album.interface";

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

  let nextImage = rest.image;

  if (imageFile) {
    nextImage = await uploadFile("album-image", imageFile);
  }

  const { data, error } = await db
    .albums()
    .update({
      title: rest.title,
      artist: rest.artist,
      image: nextImage,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const deleteAlbum = async (albumId: number) => {
  const { error: detachError } = await db.songs().update({ album_id: null }).eq("album_id", albumId);

  if (detachError) throw new Error(detachError.message);

  const { error } = await db.albums().delete().eq("id", albumId);

  if (error) throw new Error(error.message);

  return true;
};

export const attachSongsToAlbum = async (albumId: number, songIds: number[]) => {
  const { error } = await db.songs().update({ album_id: albumId }).in("id", songIds);

  if (error) throw new Error(error.message);

  return true;
};

export const detachSongFromAlbum = async (songId: number) => {
  const { error } = await db.songs().update({ album_id: null }).eq("id", songId);

  if (error) throw new Error(error.message);

  return true;
};
