import { supabase } from "@/lib/supabase/client";
import { db } from "@/lib/supabase/database";
import { storageBuckets } from "@/lib/supabase/storage";
import { uploadFile } from "@/services/helpers/upload-helper";
import type {
  ICreateSongPayload,
  IUpdateSongPayload,
} from "@/typescript/interfaces/song.interface";

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
  const { data, error } = await supabase
    .from("album_songs")
    .select(`
      song:song_id (*)
    `)
    .eq("album_id", albumId);

  if (error) throw new Error(error.message);

  return (data ?? [])
    .map((item: { song: unknown }) => item.song)
    .filter(Boolean);
};

export const getSongsForAttach = async (keyword?: string, albumId?: number) => {
  let query = db.songs().select("*").order("created_at", {
    ascending: false,
  });

  if (keyword?.trim()) {
    query = query.or(`title.ilike.%${keyword}%,artist.ilike.%${keyword}%`);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  const songs = data ?? [];

  if (!albumId) {
    return songs;
  }

  const { data: existingRelations, error: relationError } = await supabase
    .from("album_songs")
    .select("song_id")
    .eq("album_id", albumId);

  if (relationError) throw new Error(relationError.message);

  const attachedSongIds = new Set(
    (existingRelations ?? []).map((item: { song_id: number }) => item.song_id)
  );

  return songs.filter((song) => !attachedSongIds.has(song.id));
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

  const { data: existingSong, error: fetchError } = await db
    .songs()
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  let nextFileUrl = rest.file ?? existingSong.file;
  let nextImageUrl = rest.image ?? existingSong.image;

  if (files?.audioFile) {
    const oldAudioPath = getStoragePathFromUrl(existingSong.file);
    if (oldAudioPath) {
      await storageBuckets.songsFile.remove([oldAudioPath]);
    }

    nextFileUrl = await uploadFile("songs-file", files.audioFile);
  }

  if (files?.imageFile) {
    const oldImagePath = getStoragePathFromUrl(existingSong.image);
    if (oldImagePath) {
      await storageBuckets.songsImage.remove([oldImagePath]);
    }

    nextImageUrl = await uploadFile("songs-image", files.imageFile);
  }

  const { data, error } = await db
    .songs()
    .update({
      title: rest.title,
      artist: rest.artist,
      year: rest.year,
      duration: rest.duration,
      category: rest.category,
      file: nextFileUrl,
      image: nextImageUrl,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const deleteSong = async (id: number) => {
  const { data: existingSong, error: fetchError } = await db
    .songs()
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  const audioPath = getStoragePathFromUrl(existingSong.file);
  const imagePath = getStoragePathFromUrl(existingSong.image);

  if (audioPath) {
    await storageBuckets.songsFile.remove([audioPath]);
  }

  if (imagePath) {
    await storageBuckets.songsImage.remove([imagePath]);
  }

  const { error } = await db.songs().delete().eq("id", id);

  if (error) throw new Error(error.message);

  return true;
};