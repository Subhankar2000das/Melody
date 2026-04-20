import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().trim().email("Enter a valid email address").required("Email is required"),
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});
