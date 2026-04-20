import type { ISong } from "./song.interface";

export interface IAlbum {
  id: number;
  created_at: string;
  title: string;
  artist: string;
  image: string;
}

export interface IAlbumWithSongs extends IAlbum {
  songs: ISong[];
}

export interface ICreateAlbumPayload {
  title: string;
  artist: string;
  image: string;
}

export interface IUpdateAlbumPayload {
  id: number;
  title?: string;
  artist?: string;
  image?: string;
}

export interface IAlbumFormValues {
  title: string;
  artist: string;
  imageFile: File | null;
}

export interface IAttachSongsPayload {
  albumId: number;
  songIds: number[];
}