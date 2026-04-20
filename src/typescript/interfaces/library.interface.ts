import type { ISong } from "./song.interface";

export interface ILikedSong {
  id: number;
  user_id: string;
  song_id: number;
  created_at: string;
  song?: ISong;
}

export interface IPlaylist {
  id: number;
  user_id: string;
  name: string;
  created_at: string;
}

export interface IPlaylistSong {
  id: number;
  playlist_id: number;
  song_id: number;
  created_at: string;
  song?: ISong;
}

export interface ICreatePlaylistPayload {
  name: string;
  user_id: string;
}