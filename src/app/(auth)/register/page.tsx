import Link from "next/link";

import RegisterForm from "@/components/forms/register-form";

const RegisterPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-white">Create account</h1>
        <p className="text-sm text-gray-400">
          Register to continue to Melody.
        </p>
      </div>

      <RegisterForm />

      <p className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-[#1db954] transition hover:text-[#1ed760]"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;