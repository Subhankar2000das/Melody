"use client";

import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { useLikedSongsQuery } from "@/hooks/queries/useLikedSongsQuery";
import { useLikeSongMutation } from "@/hooks/mutations/useLikeSongMutation";
import { useUnlikeSongMutation } from "@/hooks/mutations/useUnlikeSongMutation";

type Props = {
  songId: number;
};

const LikeSongButton = ({ songId }: Props) => {
  const { authUser } = useAuthStore();

  const userId = authUser?.id ?? "";
  const { data: likedSongs = [] } = useLikedSongsQuery(userId);
  const { mutateAsync: likeSong, isPending: isLiking } = useLikeSongMutation();
  const { mutateAsync: unlikeSong, isPending: isUnliking } = useUnlikeSongMutation();

  const isLiked = likedSongs.some((item) => item.song_id === songId);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!authUser?.id) {
      toast.error("Please login to like songs");
      return;
    }

    try {
      if (isLiked) {
        await unlikeSong({ userId: authUser.id, songId });
        toast.success("Removed from liked songs");
      } else {
        await likeSong({ userId: authUser.id, songId });
        toast.success("Added to liked songs");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Action failed");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLiking || isUnliking}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
    >
      <Heart
        className={`h-4 w-4 transition ${
          isLiked ? "fill-[#1db954] text-[#1db954]" : "text-white"
        }`}
      />
    </button>
  );
};

export default LikeSongButton;