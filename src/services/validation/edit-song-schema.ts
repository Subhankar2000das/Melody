import * as yup from "yup";
import type { SongCategory } from "@/typescript/types/song.type";

export interface IEditSongFormValues {
  title: string;
  artist: string;
  year: number;
  category: SongCategory;
  audioFile: File | null;
  imageFile: File | null;
  album_id: number | null;
}

export const editSongSchema: yup.ObjectSchema<IEditSongFormValues> = yup
  .object({
    title: yup.string().trim().required("Song title is required"),
    artist: yup.string().trim().required("Artist name is required"),
    year: yup
      .number()
      .typeError("Year must be a number")
      .required("Year is required")
      .min(1900, "Year is too old")
      .max(new Date().getFullYear(), "Year cannot be in the future"),
    category: yup
      .mixed<SongCategory>()
      .oneOf(["Sad", "Romantic", "Party", "English"], "Invalid category")
      .required("Category is required"),
    audioFile: yup.mixed<File>().nullable().default(null),
    imageFile: yup.mixed<File>().nullable().default(null),
    album_id: yup.number().nullable().default(null),
  })
  .required();