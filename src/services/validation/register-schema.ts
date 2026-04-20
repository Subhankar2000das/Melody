import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().trim().required("Name is required").min(2, "Name must be at least 2 characters"),
  email: yup.string().trim().email("Enter a valid email address").required("Email is required"),
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .trim()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
