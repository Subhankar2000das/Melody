import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env: ${key}`);
  return value;
};

export async function middleware(request: NextRequest) {
  let response = NextResponse.next();

  const supabase = createServerClient(
    getEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthRoute = pathname === "/login" || pathname === "/register";

  // 🚫 NOT LOGGED IN → block admin
  if (isAdminRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 🔐 LOGGED IN → get role
  let role: string | null = null;

  if (user) {
    const { data } = await supabase
      .from("registration")
      .select("role")
      .eq("auth_user_id", user.id)
      .single();

    role = data?.role ?? null;
  }

  // 🚫 USER trying admin → block BEFORE render (FIXES FLICKER)
  if (isAdminRoute && role !== "admin") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // 🔁 LOGGED IN user/admin → block login/register
  if (isAuthRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = role === "admin" ? "/admin/dashboard" : "/";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};