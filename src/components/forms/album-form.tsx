"use client";

import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

import { albumSchema } from "@/services/validation/album-schema";
import { useAddAlbumMutation } from "@/hooks/mutations/useAddAlbumMutation";

type AlbumFormValues = {
  title: string;
  artist: string;
  imageFile: File | null;
};

const AlbumForm = () => {
  const { mutateAsync, isPending } = useAddAlbumMutation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<AlbumFormValues>({
    resolver: yupResolver(albumSchema),
    defaultValues: {
      title: "",
      artist: "",
      imageFile: null,
    },
  });

  const onSubmit: SubmitHandler<AlbumFormValues> = async (values) => {
    try {
      if (!values.imageFile) {
        toast.error("Cover image is required");
        return;
      }

      await mutateAsync({
        payload: {
          title: values.title,
          artist: values.artist,
        },
        imageFile: values.imageFile,
      });

      toast.success("Album added successfully");

      reset({
        title: "",
        artist: "",
        imageFile: null,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add album");
    }
  };

  return (
    <div className="max-w-2xl rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-[#1a1a1a] to-[#121212] p-8 shadow-2xl">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
          Album Details
        </p>
        <h2 className="mt-2 text-3xl font-bold text-white">Create New Album</h2>
        <p className="mt-2 text-sm text-gray-400">
          Add a new album with artist info and cover image.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
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
                  placeholder="Enter album title"
                />
              )}
            />
            <p className="mt-2 text-sm text-red-400">{errors.title?.message}</p>
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
                  placeholder="Enter artist name"
                />
              )}
            />
            <p className="mt-2 text-sm text-red-400">{errors.artist?.message}</p>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Cover Image
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
                  setValue("imageFile", file, { shouldValidate: true });
                }}
                className="block w-full rounded-2xl border border-dashed border-gray-600 bg-[#0f0f0f] px-4 py-6 text-sm text-white file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-emerald-600"
              />
            )}
          />
          <p className="mt-2 text-sm text-red-400">
            {errors.imageFile?.message as string}
          </p>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending} className="min-w-[160px]">
            {isPending ? "Adding Album..." : "Add Album"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AlbumForm;