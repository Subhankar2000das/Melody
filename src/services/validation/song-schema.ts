import * as yup from "yup";
import type { ISongFormValues } from "@/typescript/interfaces/song.interface";

export const songSchema: yup.ObjectSchema<ISongFormValues> = yup
  .object({
    title: yup.string().trim().required("Song title is required"),
    artist: yup.string().trim().required("Artist name is required"),
    year: yup
      .number()
      .transform((value, originalValue) => {
        return originalValue === "" || Number.isNaN(value) ? 0 : value;
      })
      .typeError("Year must be a number")
      .required("Year is required")
      .min(1900, "Year is too old")
      .max(new Date().getFullYear(), "Year cannot be in the future"),
    category: yup
      .mixed<ISongFormValues["category"]>()
      .oneOf(["Sad", "Romantic", "Party", "English"], "Invalid category")
      .required("Category is required"),
    audioFile: yup
      .mixed<File>()
      .nullable()
      .required("Audio file is required"),
    imageFile: yup
      .mixed<File>()
      .nullable()
      .required("Song image is required"),
    album_id: yup
      .number()
      .nullable()
      .transform((value, originalValue) => {
        return originalValue === "" || Number.isNaN(value) ? null : value;
      })
      .default(null),
  })
  .required();