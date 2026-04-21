"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import BackButton from "@/components/ui/back-button";
import Header from "@/components/admin/header";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import EmptyState from "@/components/ui/empty-state";

import {
  editAlbumSchema,
  type IEditAlbumFormValues,
} from "@/services/validation/edit-album-schema";
import { useAlbumById } from "@/hooks/queries/useAlbumById";
import { useUpdateAlbumMutation } from "@/hooks/mutations/useUpdateAlbumMutation";

const EditAlbumPage = () => {
  const router = useRouter();
  const params = useParams();

  const rawId = params?.id;
  const albumId = Number(Array.isArray(rawId) ? rawId[0] : rawId);

  const { data: album, isLoading } = useAlbumById(
    Number.isFinite(albumId) ? albumId : undefined
  );
  const { mutateAsync, isPending } = useUpdateAlbumMutation();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IEditAlbumFormValues>({
    resolver: yupResolver(editAlbumSchema),
    defaultValues: {
      title: "",
      artist: "",
      imageFile: null,
    },
  });

  useEffect(() => {
    if (!album) return;

    reset({
      title: album.title,
      artist: album.artist,
      imageFile: null,
    });
  }, [album, reset]);

  const onSubmit: SubmitHandler<IEditAlbumFormValues> = async (values) => {
    try {
      if (!album?.id) return;

      await mutateAsync({
        payload: {
          id: album.id,
          title: values.title,
          artist: values.artist,
          image: album.image,
        },
        imageFile: values.imageFile,
      });

      toast.success("Album updated successfully");
      router.push("/admin/albums");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update album");
    }
  };

  if (!Number.isFinite(albumId)) {
    return <EmptyState message="Invalid album id." />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!album) {
    return <EmptyState message="Album not found." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
  <Header
    title="Edit Album"
    subtitle="Update album details. Re-upload cover only if needed."
  />
  <BackButton />
</div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-white/10 bg-[#181818] p-6 space-y-4"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Album Title
          </label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Album Title"
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
            Replace Album Cover (optional)
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

        <div className="rounded-xl border border-white/5 bg-[#121212] p-4">
          <p className="mb-3 text-sm text-gray-400">Current Cover</p>
          <img
            src={album.image}
            alt={album.title}
            className="h-36 w-36 rounded-lg object-cover"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending} className="min-w-[160px]">
            {isPending ? "Updating Album..." : "Update Album"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditAlbumPage;