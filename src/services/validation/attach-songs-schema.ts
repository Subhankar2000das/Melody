import * as yup from "yup";

export interface IAttachSongsFormValues {
  albumId: number;
  songIds: number[];
}

export const attachSongsSchema: yup.ObjectSchema<IAttachSongsFormValues> = yup
  .object({
    albumId: yup
      .number()
      .typeError("Album id is invalid")
      .required("Album id is required"),
    songIds: yup
      .array()
      .of(yup.number().required())
      .min(1, "Select at least one song")
      .required("Song selection is required"),
  })
  .required();