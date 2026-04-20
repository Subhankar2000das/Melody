import type { RepeatMode } from "../types/song.type";
import type { ISong } from "./song.interface";

export interface IPlayerState {
  queue: ISong[];
  currentTrack: ISong | null;
  currentIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffled: boolean;
  repeatMode: RepeatMode;
}

export interface IPlayerStore extends IPlayerState {
  setQueue: (tracks: ISong[], startIndex?: number) => void;
  setCurrentTrack: (track: ISong | null) => void;
  setCurrentIndex: (index: number) => void;
  setIsPlaying: (value: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setIsMuted: (value: boolean) => void;
  setIsShuffled: (value: boolean) => void;
  setRepeatMode: (mode: RepeatMode) => void;
  playTrack: (track: ISong, queue?: ISong[]) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlay: () => void;
  resetPlayer: () => void;
}
