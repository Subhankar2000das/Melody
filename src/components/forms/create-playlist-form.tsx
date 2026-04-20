"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";
import { useCreatePlaylistMutation } from "@/hooks/mutations/useCreatePlaylistMutation";

const CreatePlaylistForm = () => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const { authUser } = useAuthStore();
  const { mutateAsync, isPending } = useCreatePlaylistMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!authUser?.id) {
      toast.error("Please login first");
      return;
    }

    if (!name.trim()) {
      toast.error("Playlist name is required");
      return;
    }

    try {
      await mutateAsync({
        name: name.trim(),
        user_id: authUser.id,
      });

      toast.success("Playlist created successfully");
      setName("");
      setOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create playlist");
    }
  };

  if (!open) {
    return (
      <Button type="button" onClick={() => setOpen(true)}>
        Create Playlist
      </Button>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#181818] p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Create Playlist</h3>

        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setName("");
          }}
          className="rounded-full p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New playlist name"
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default CreatePlaylistForm;