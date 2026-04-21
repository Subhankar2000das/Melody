"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";

type Props = {
  label?: string;
};

const BackButton = ({ label = "← Back" }: Props) => {
  const router = useRouter();

  return (
    <Button
      type="button"
      onClick={() => router.back()}
      className="bg-white/10 text-white hover:bg-white/20"
    >
      {label}
    </Button>
  );
};

export default BackButton;