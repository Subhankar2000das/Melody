import * as yup from "yup";
import type { IAlbumFormValues } from "@/typescript/interfaces/album.interface";

export const albumSchema: yup.ObjectSchema<IAlbumFormValues> = yup
  .object({
    title: yup.string().trim().required("Album title is required"),
    artist: yup.string().trim().required("Artist name is required"),
    imageFile: yup
      .mixed<File>()
      .nullable()
      .required("Album cover image is required"),
  })
  .required();