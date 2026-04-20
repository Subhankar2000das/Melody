import { usePlayerStore } from "@/store/player-store";

export const usePlayer = () => {
  return usePlayerStore();
};
