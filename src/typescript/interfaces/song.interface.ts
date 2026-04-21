import type { SongCategory } from "../types/song.type";

export interface ISong {
  id: number;
  title: string;
  artist: string;
  image: string;
  file: string;
  duration: number;
  year: number;
  category: SongCategory;
  created_at?: string;
}

export interface ICreateSongPayload {
  title: string;
  artist: string;
  year: number;
  duration: number;
  file: string;
  image: string;
  category: SongCategory;
  album_id?: number | null;
}

export interface IUpdateSongPayload {
  id: number;
  title?: string;
  artist?: string;
  year?: number;
  duration?: number;
  file?: string;
  image?: string;
  category?: SongCategory;
  album_id?: number | null;
}

export interface ISongFormValues {
  title: string;
  artist: string;
  year: number;
  category: SongCategory;
  audioFile: File | null;
  imageFile: File | null;
  album_id: number | null;
}