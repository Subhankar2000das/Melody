declare global {
  type Nullable<T> = T | null;
  type Optional<T> = T | undefined;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  }
}




export {};