"use client";

import { useMemo, useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Button from "@/components/ui/button";

import { songSchema } from "@/services/validation/song-schema";
import { formatDuration } from "@/services/helpers/format-duration";
import { useAddSongMutation } from "@/hooks/mutations/useAddSongMutation";
import { useAlbumsQuery } from "@/hooks/queries/useAlbumsQuery";

import type { ISongFormValues } from "@/typescript/interfaces/song.interface";
import type { SongCategory } from "@/typescript/types/song.type";

const categoryOptions = [
  { label: "Sad", value: "Sad" },
  { label: "Romantic", value: "Romantic" },
  { label: "Party", value: "Party" },
  { label: "English", value: "English" },
];

const SongForm = () => {
  const [duration, setDuration] = useState<number | null>(null);

  const { data: albums = [] } = useAlbumsQuery();
  const { mutateAsync, isPending } = useAddSongMutation();

  const albumOptions = useMemo(
    () => [
      { label: "No Album", value: "" },
      ...albums.map((album) => ({
        label: `${album.title} - ${album.artist}`,
        value: album.id,
      })),
    ],
    [albums]
  );

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ISongFormValues>({
    resolver: yupResolver(songSchema),
    defaultValues: {
      title: "",
      artist: "",
      year: new Date().getFullYear(),
      category: "Sad",
      album_id: null,
      audioFile: null,
      imageFile: null,
    },
    mode: "onSubmit",
  });

  const calculateAudioDuration = (file: File) => {
    const audio = document.createElement("audio");
    const url = URL.createObjectURL(file);

    audio.src = url;
    audio.onloadedmetadata = () => {
      setDuration(Math.floor(audio.duration));
      URL.revokeObjectURL(url);
    };
  };

  const onSubmit: SubmitHandler<ISongFormValues> = async (values) => {
    try {
      if (!values.audioFile || !values.imageFile) {
        toast.error("Audio and cover image are required");
        return;
      }

      await mutateAsync({
        payload: {
          title: values.title,
          artist: values.artist,
          year: values.year,
          category: values.category as SongCategory,
          album_id: values.album_id,
          duration: duration ?? 0,
        },
        files: {
          audioFile: values.audioFile,
          imageFile: values.imageFile,
        },
      });

      toast.success("Song added successfully");

      reset({
        title: "",
        artist: "",
        year: new Date().getFullYear(),
        category: "Sad",
        album_id: null,
        audioFile: null,
        imageFile: null,
      });

      setDuration(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add song");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="Song Title"
            />
          )}
        />
        <p className="mt-1 text-sm text-red-400">{errors.title?.message}</p>
      </div>

      <div>
        <Controller
          name="artist"
          control={control}
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="Artist"
            />
          )}
        />
        <p className="mt-1 text-sm text-red-400">{errors.artist?.message}</p>
      </div>

      <div>
        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <Input
              type="number"
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
              onBlur={field.onBlur}
              placeholder="Year"
            />
          )}
        />
        <p className="mt-1 text-sm text-red-400">{errors.year?.message}</p>
      </div>

      <div>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              options={categoryOptions}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value as SongCategory)}
            />
          )}
        />
        <p className="mt-1 text-sm text-red-400">{errors.category?.message}</p>
      </div>

      <div>
        <Controller
          name="album_id"
          control={control}
          render={({ field }) => (
            <Select
              options={albumOptions}
              value={field.value ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value ? Number(value) : null);
              }}
            />
          )}
        />
        <p className="mt-1 text-sm text-red-400">
          {errors.album_id?.message as string}
        </p>
      </div>

      <div>
        <Controller
          name="audioFile"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                field.onChange(file);
                setValue("audioFile", file, { shouldValidate: true });
                if (file) {
                  calculateAudioDuration(file);
                } else {
                  setDuration(null);
                }
              }}
              className="block w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white"
            />
          )}
        />
        <p className="mt-1 text-sm text-red-400">
          {errors.audioFile?.message as string}
        </p>
        {duration !== null ? (
          <p className="mt-2 text-sm text-gray-300">
            Duration: {formatDuration(duration)}
          </p>
        ) : null}
      </div>

      <div>
        <Controller
          name="imageFile"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                field.onChange(file);
                setValue("imageFile", file, { shouldValidate: true });
              }}
              className="block w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white"
            />
          )}
        />
        <p className="mt-1 text-sm text-red-400">
          {errors.imageFile?.message as string}
        </p>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Adding Song..." : "Add Song"}
      </Button>
    </form>
  );
};

export default SongForm;