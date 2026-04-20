import Link from "next/link";

import LoginForm from "@/components/forms/login-form";

const LoginPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-white">Welcome back</h1>
        <p className="text-sm text-gray-400">
          Login to continue.
        </p>
      </div>

      <LoginForm />

      <p className="text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-[#1db954] transition hover:text-[#1ed760]"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;