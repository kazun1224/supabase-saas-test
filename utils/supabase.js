import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,// url
  process.env.NEXT_PUBLIC_SUPABASE_KEY// key
);
