import type { IAlbum } from "./album.interface";
import type { ISong } from "./song.interface";

export interface ISearchResponse {
  songs: ISong[];
  albums: IAlbum[];
}
