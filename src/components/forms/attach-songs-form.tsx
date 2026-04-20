"use client";

import { useMemo, useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/ui/empty-state";
import AttachSongsList from "@/components/album/attach-songs-list";

import {
  attachSongsSchema,
  type IAttachSongsFormValues,
} from "@/services/validation/attach-songs-schema";
import { useSongsForAttachQuery } from "@/hooks/queries/useSongsForAttachQuery";
import { useAttachSongsToAlbumMutation } from "@/hooks/mutations/useAttachSongsToAlbumMutation";

type Props = {
  albumId: number;
};

const AttachSongsForm = ({ albumId }: Props) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const { data: songs = [], isLoading } = useSongsForAttachQuery(searchKeyword);
  const { mutateAsync, isPending } = useAttachSongsToAlbumMutation();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<IAttachSongsFormValues>({
    resolver: yupResolver(attachSongsSchema),
    defaultValues: {
      albumId,
      songIds: [],
    },
  });

  const selectedSongIds = watch("songIds") ?? [];

  const selectedCountLabel = useMemo(() => {
    const count = selectedSongIds.length;
    return `${count} song${count === 1 ? "" : "s"} selected`;
  }, [selectedSongIds]);

  const handleToggleSong = (songId: number) => {
    const next = selectedSongIds.includes(songId)
      ? selectedSongIds.filter((id) => id !== songId)
      : [...selectedSongIds, songId];

    setValue("songIds", next, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<IAttachSongsFormValues> = async (values) => {
    try {
      await mutateAsync({
        albumId: values.albumId,
        songIds: values.songIds,
      });

      toast.success("Songs attached successfully");

      reset({
        albumId,
        songIds: [],
      });

      setSearchKeyword("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to attach songs");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl border border-white/5 bg-[#181818] p-5"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Attach Songs</h2>
          <p className="mt-1 text-sm text-gray-400">
            Search available songs and attach multiple songs to this album.
          </p>
        </div>

        <div className="text-sm text-gray-300">{selectedCountLabel}</div>
      </div>

      <Controller
        name="albumId"
        control={control}
        render={({ field }) => (
          <input
            type="hidden"
            value={Number.isFinite(field.value) ? field.value : ""}
            readOnly
          />
        )}
      />

      <Input
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="Search by song title or artist"
      />

      <p className="text-sm text-red-400">
        {(errors.songIds?.message as string) || errors.albumId?.message}
      </p>

      {isLoading ? (
        <Loader />
      ) : !songs.length ? (
        <EmptyState message="No available songs found to attach." />
      ) : (
        <AttachSongsList
          songs={songs}
          selectedSongIds={selectedSongIds}
          onToggle={handleToggleSong}
        />
      )}

      <Button type="submit" disabled={!selectedSongIds.length || isPending}>
        {isPending ? "Attaching..." : "Attach Songs"}
      </Button>
    </form>
  );
};

export default AttachSongsForm;