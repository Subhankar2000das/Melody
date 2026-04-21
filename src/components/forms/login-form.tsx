"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

import { loginSchema } from "@/services/validation/login-schema";
import { useAuthStore } from "@/store/auth-store";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      const result = await login(values);

      toast.success("Login successful");

      if (result.profile?.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              type={showPassword ? "text" : "password"}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="Password"
              rightIcon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              onRightIconClick={() => setShowPassword((prev) => !prev)}
            />
          )}
        />
        <p className="mt-1 text-sm text-red-400">{errors.password?.message}</p>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;