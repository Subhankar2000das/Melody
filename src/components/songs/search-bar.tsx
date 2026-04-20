"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  initialValue?: string;
};

const SearchBar = ({ initialValue = "" }: Props) => {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = value.trim();

    if (!trimmed) {
      router.push("/search");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search songs or albums..."
        className="w-full rounded-xl border border-white/10 bg-[#181818] px-4 py-3 text-white outline-none placeholder:text-gray-400 focus:border-[#1db954]"
      />
    </form>
  );
};

export default SearchBar;