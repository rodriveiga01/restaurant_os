import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
    const cookieStore = cookies()

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase URL or Anon Key is not defined');
    }

    return createServerClient(
        supabaseUrl,
        supabaseKey,
        {
            cookies: cookieStore,
            cookieOptions: {
                getAll: () => cookieStore.getAll(),
                setAll: (cookiesToSet: { name: any; value: any; options: any }[]) => {
                    cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
                },
            },
        }
    )
}