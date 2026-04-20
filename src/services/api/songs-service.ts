import { db } from "@/lib/supabase/database";
import { uploadFile } from "../helpers/upload-helper";
import type {
  ICreateSongPayload,
  IUpdateSongPayload,
} from "@/typescript/interfaces/song.interface";

export const getSongs = async () => {
  const { data, error } = await db.songs().select("*").order("created_at", {
    ascending: false,
  });

  if (error) throw new Error(error.message);

  return data ?? [];
};

export const getSongById = async (id: number) => {
  const { data, error } = await db.songs().select("*").eq("id", id).single();

  if (error) throw new Error(error.message);

  return data;
};

export const getSongsByCategory = async (category: string) => {
  const { data, error } = await db.songs().select("*").eq("category", category);

  if (error) throw new Error(error.message);

  return data ?? [];
};

export const getSongsByAlbum = async (albumId: number) => {
  const { data, error } = await db.songs().select("*").eq("album_id", albumId);

  if (error) throw new Error(error.message);

  return data ?? [];
};

export const getSongsForAttach = async (keyword?: string) => {
  let query = db.songs().select("*").is("album_id", null).order("created_at", {
    ascending: false,
  });

  if (keyword?.trim()) {
    query = query.or(`title.ilike.%${keyword}%,artist.ilike.%${keyword}%`);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data ?? [];
};

export const addSong = async (
  payload: Omit<ICreateSongPayload, "file" | "image">,
  files: { audioFile: File; imageFile: File }
) => {
  const fileUrl = await uploadFile("songs-file", files.audioFile);
  const imageUrl = await uploadFile("songs-image", files.imageFile);

  const { data, error } = await db
    .songs()
    .insert({
      ...payload,
      file: fileUrl,
      image: imageUrl,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const updateSong = async (
  payload: IUpdateSongPayload,
  files?: { audioFile?: File | null; imageFile?: File | null }
) => {
  const { id, ...rest } = payload;

  let nextPayload: IUpdateSongPayload = { ...rest, id };

  if (files?.audioFile) {
    const fileUrl = await uploadFile("songs-file", files.audioFile);
    nextPayload.file = fileUrl;
  }

  if (files?.imageFile) {
    const imageUrl = await uploadFile("songs-image", files.imageFile);
    nextPayload.image = imageUrl;
  }

  const { data, error } = await db
    .songs()
    .update({
      title: nextPayload.title,
      artist: nextPayload.artist,
      year: nextPayload.year,
      duration: nextPayload.duration,
      file: nextPayload.file,
      image: nextPayload.image,
      category: nextPayload.category,
      album_id: nextPayload.album_id,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const deleteSong = async (id: number) => {
  const { error } = await db.songs().delete().eq("id", id);

  if (error) throw new Error(error.message);

  return true;
};
