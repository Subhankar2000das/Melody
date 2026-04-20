"use client";

import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

import { registerSchema } from "@/services/validation/register-schema";
import { useAuthStore } from "@/store/auth-store";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const router = useRouter();
  const { register: registerUser } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (values) => {
    try {
      await registerUser(values);
      toast.success("Account created successfully");
      router.push("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="Name"
            />
          )}
        />
        <p className="mt-1 text-sm text-red-400">{errors.name?.message}</p>
      </div>

      <div>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="Email"
            />
          )}
        />
        <p className="mt-1 text-sm text-red-400">{errors.email?.message}</p>
      </div>

      <div>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              type="password"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="Password"
            />
          )}
        />
        <p className="mt-1 text-sm text-red-400">{errors.password?.message}</p>
      </div>

      <div>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input
              type="password"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="Confirm Password"
            />
          )}
        />
        <p className="mt-1 text-sm text-red-400">
          {errors.confirmPassword?.message}
        </p>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Creating account..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;