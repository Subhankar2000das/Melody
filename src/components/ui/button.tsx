import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

const Button = ({
  variant = "primary",
  className = "",
  ...props
}: Props) => {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition";

  const variants = {
    primary: "bg-green-500 text-white hover:bg-green-600",
    secondary: "bg-gray-700 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className}`}
    />
  );
};

export default Button;