import { create } from "zustand";
import type { ISong } from "@/typescript/interfaces/song.interface";

type PlayerState = {
  currentSong: ISong | null;
  queue: ISong[];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  recentlyPlayed: ISong[];

  play: (song: ISong, queue?: ISong[]) => void;
  playQueue: (songs: ISong[]) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (time: number) => void;
  setVolume: (value: number) => void;
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  queue: [],
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  recentlyPlayed: [],

  play: (song, queue = []) => {
    const recent = get().recentlyPlayed.filter((item) => item.id !== song.id);

    set({
      currentSong: song,
      queue,
      isPlaying: true,
      currentTime: 0,
      recentlyPlayed: [song, ...recent].slice(0, 20),
    });
  },

  playQueue: (songs) => {
  if (!songs.length) return;

  const firstSong = songs[0];

  // 🔐 safety check
  if (!firstSong) return;

  const recent = get().recentlyPlayed.filter(
    (item) => item.id !== firstSong.id
  );

  set({
    currentSong: firstSong,
    queue: songs,
    isPlaying: true,
    currentTime: 0,
    recentlyPlayed: [firstSong, ...recent].slice(0, 20),
  });
},

  toggle: () => {
    set((state) => ({ isPlaying: !state.isPlaying }));
  },

  next: () => {
    const { queue, currentSong, recentlyPlayed } = get();
    if (!queue.length || !currentSong) return;

    const index = queue.findIndex((s) => s.id === currentSong.id);
    const nextSong = queue[index + 1];

    if (nextSong) {
      const nextRecent = recentlyPlayed.filter((item) => item.id !== nextSong.id);

      set({
        currentSong: nextSong,
        isPlaying: true,
        currentTime: 0,
        recentlyPlayed: [nextSong, ...nextRecent].slice(0, 20),
      });
    }
  },

  prev: () => {
    const { queue, currentSong, recentlyPlayed } = get();
    if (!queue.length || !currentSong) return;

    const index = queue.findIndex((s) => s.id === currentSong.id);
    const prevSong = queue[index - 1];

    if (prevSong) {
      const nextRecent = recentlyPlayed.filter((item) => item.id !== prevSong.id);

      set({
        currentSong: prevSong,
        isPlaying: true,
        currentTime: 0,
        recentlyPlayed: [prevSong, ...nextRecent].slice(0, 20),
      });
    }
  },

  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (time) => set({ duration: time }),
  setVolume: (value) => set({ volume: value }),
}));