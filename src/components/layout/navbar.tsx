"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { useSearchQuery } from "@/hooks/queries/useSearchQuery";
import Button from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

type Props = {
  onMenuClick?: () => void;
};

const Navbar = ({ onMenuClick }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { authUser, logout } = useAuthStore();

  const [keyword, setKeyword] = useState(searchParams.get("q") ?? "");
  const [debounced, setDebounced] = useState(keyword);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(keyword);
    }, 250);

    return () => clearTimeout(timer);
  }, [keyword]);

  const { data } = useSearchQuery(debounced);

  const suggestions = useMemo(() => {
    const songSuggestions = (data?.songs ?? []).slice(0, 5).map((song) => ({
      id: `song-${song.id}`,
      title: song.title,
      subtitle: song.artist,
      type: "Song",
    }));

    const albumSuggestions = (data?.albums ?? []).slice(0, 5).map((album) => ({
      id: `album-${album.id}`,
      title: album.title,
      subtitle: album.artist,
      type: "Album",
    }));

    return [...songSuggestions, ...albumSuggestions];
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = keyword.trim();

    if (!trimmed) {
      router.push("/search");
      setOpen(false);
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setOpen(false);
  };

  const handleAuthClick = async () => {
    if (authUser?.id) {
      await logout();
      router.push("/");
      return;
    }

    router.push("/login");
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#121212] px-4 py-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-white hover:bg-white/10 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <h1 className="text-lg font-bold text-white">Melody</h1>
      </div>

      <div className="order-3 w-full md:order-2 md:max-w-xl md:flex-1">
        <div className="relative">
          <form
            onSubmit={handleSubmit}
            className="flex overflow-hidden rounded-full border border-white/10 bg-[#1a1a1a]"
          >
            <input
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              className="flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-gray-400"
              placeholder="Search songs or albums..."
            />

            <button type="submit" className="px-4">
              <Search className="h-4 w-4 text-white" />
            </button>
          </form>

          {open && keyword.trim() && suggestions.length > 0 ? (
            <div className="absolute top-12 z-50 w-full rounded-2xl border border-white/10 bg-[#181818] p-2 shadow-2xl">
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    router.push(`/search?q=${encodeURIComponent(item.title)}`);
                    setKeyword(item.title);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-white/10"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {item.title}
                    </p>
                    <p className="truncate text-xs text-gray-400">
                      {item.subtitle}
                    </p>
                  </div>

                  <span className="ml-3 text-xs text-gray-500">{item.type}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="order-2 md:order-3">
        <Button
          type="button"
          onClick={handleAuthClick}
          className={
            authUser?.id
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-[#1db954] text-black hover:bg-[#1ed760]"
          }
        >
          {authUser?.id ? "Logout" : "Login"}
        </Button>
      </div>
    </header>
  );
};

export default Navbar;