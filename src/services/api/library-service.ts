import { supabase } from "@/lib/supabase/client";
import type {
  ICreatePlaylistPayload,
  IPlaylist,
} from "@/typescript/interfaces/library.interface";

export const getLikedSongs = async (userId: string) => {
  const { data, error } = await supabase
    .from("liked_songs")
    .select(`
      *,
      song:song_id (*)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
};

export const addLikedSong = async (userId: string, songId: number) => {
  const { data, error } = await supabase
    .from("liked_songs")
    .insert({
      user_id: userId,
      song_id: songId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const removeLikedSong = async (userId: string, songId: number) => {
  const { error } = await supabase
    .from("liked_songs")
    .delete()
    .eq("user_id", userId)
    .eq("song_id", songId);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};

export const getPlaylists = async (userId: string) => {
  const { data, error } = await supabase
    .from("playlists")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as IPlaylist[];
};

export const createPlaylist = async (payload: ICreatePlaylistPayload) => {
  const { data, error } = await supabase
    .from("playlists")
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as IPlaylist;
};

export const deletePlaylist = async (playlistId: number) => {
  const { error } = await supabase
    .from("playlists")
    .delete()
    .eq("id", playlistId);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};

export const getPlaylistSongs = async (playlistId: number) => {
  const { data, error } = await supabase
    .from("playlist_songs")
    .select(`
      *,
      song:song_id (*)
    `)
    .eq("playlist_id", playlistId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
};

export const addSongToPlaylist = async (playlistId: number, songId: number) => {
  const { data, error } = await supabase
    .from("playlist_songs")
    .insert({
      playlist_id: playlistId,
      song_id: songId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const removeSongFromPlaylist = async (playlistId: number, songId: number) => {
  const { error } = await supabase
    .from("playlist_songs")
    .delete()
    .eq("playlist_id", playlistId)
    .eq("song_id", songId);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};