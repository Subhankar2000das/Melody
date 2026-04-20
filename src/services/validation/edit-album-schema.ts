import * as yup from "yup";

export interface IEditAlbumFormValues {
  title: string;
  artist: string;
  imageFile: File | null;
}

export const editAlbumSchema: yup.ObjectSchema<IEditAlbumFormValues> = yup
  .object({
    title: yup.string().trim().required("Album title is required"),
    artist: yup.string().trim().required("Artist name is required"),
    imageFile: yup.mixed<File>().nullable().default(null),
  })
  .required();