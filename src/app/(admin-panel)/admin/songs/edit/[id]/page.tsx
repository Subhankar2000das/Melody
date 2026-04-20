"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import Header from "@/components/admin/header";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Button from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/ui/empty-state";

import {
  editSongSchema,
  type IEditSongFormValues,
} from "@/services/validation/edit-song-schema";
import { formatDuration } from "@/services/helpers/format-duration";

import { useSongById } from "@/hooks/queries/useSongById";
import { useAlbumsQuery } from "@/hooks/queries/useAlbumsQuery";
import { useUpdateSongMutation } from "@/hooks/mutations/useUpdateSongMutation";

import type { SongCategory } from "@/typescript/types/song.type";

const categoryOptions = [
  { label: "Sad", value: "Sad" },
  { label: "Romantic", value: "Romantic" },
  { label: "Party", value: "Party" },
  { label: "English", value: "English" },
];

const EditSongPage = () => {
  const router = useRouter();
  const params = useParams();

  const rawId = params?.id;
  const songId = Number(Array.isArray(rawId) ? rawId[0] : rawId);

  const { data: song, isLoading: songLoading } = useSongById(
    Number.isFinite(songId) ? songId : undefined
  );
  const { data: albums = [], isLoading: albumsLoading } = useAlbumsQuery();
  const { mutateAsync, isPending } = useUpdateSongMutation();

  const [duration, setDuration] = useState<number | null>(null);

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
    reset,
    setValue,
    formState: { errors },
  } = useForm<IEditSongFormValues>({
    resolver: yupResolver(editSongSchema),
    defaultValues: {
      title: "",
      artist: "",
      year: new Date().getFullYear(),
      category: "Sad",
      album_id: null,
      audioFile: null,
      imageFile: null,
    },
  });

  useEffect(() => {
    if (!song) return;

    reset({
      title: song.title,
      artist: song.artist,
      year: song.year,
      category: song.category,
      album_id: song.album_id,
      audioFile: null,
      imageFile: null,
    });

    setDuration(song.duration ?? null);
  }, [song, reset]);

  const calculateAudioDuration = (file: File) => {
    const audio = document.createElement("audio");
    const url = URL.createObjectURL(file);

    audio.src = url;
    audio.onloadedmetadata = () => {
      setDuration(Math.floor(audio.duration));
      URL.revokeObjectURL(url);
    };
  };

  const onSubmit: SubmitHandler<IEditSongFormValues> = async (values) => {
    try {
      if (!song?.id) return;

      await mutateAsync({
        payload: {
          id: song.id,
          title: values.title,
          artist: values.artist,
          year: values.year,
          category: values.category as SongCategory,
          album_id: values.album_id,
          duration: duration ?? song.duration,
        },
        files: {
          audioFile: values.audioFile,
          imageFile: values.imageFile,
        },
      });

      toast.success("Song updated successfully");
      router.push("/admin/songs");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update song");
    }
  };

  if (!Number.isFinite(songId)) {
    return <EmptyState message="Invalid song id." />;
  }

  if (songLoading || albumsLoading) {
    return <Loader />;
  }

  if (!song) {
    return <EmptyState message="Song not found." />;
  }

  return (
    <div className="space-y-6">
      <Header
        title="Edit Song"
        subtitle="Update song details. Re-upload audio or cover only if needed."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-white/10 bg-[#181818] p-6 space-y-4"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Song Title
          </label>
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
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Artist
          </label>
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
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Year
          </label>
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
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Category
          </label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                options={categoryOptions}
                value={field.value}
                onChange={(e) =>
                  field.onChange(e.target.value as SongCategory)
                }
              />
            )}
          />
          <p className="mt-1 text-sm text-red-400">{errors.category?.message}</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Album
          </label>
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
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Replace Audio File (optional)
          </label>
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
                  setValue("audioFile", file);
                  if (file) {
                    calculateAudioDuration(file);
                  }
                }}
                className="block w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white"
              />
            )}
          />
          <p className="mt-2 text-sm text-gray-300">
            Current duration: {formatDuration(duration ?? song.duration)}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Replace Cover Image (optional)
          </label>
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
                  setValue("imageFile", file);
                }}
                className="block w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white"
              />
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending} className="min-w-[160px]">
            {isPending ? "Updating Song..." : "Update Song"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditSongPage;