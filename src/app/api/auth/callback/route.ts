import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/profile'; //change to main route
  console.log(code)
  
  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );

    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    console.log(error, data)
    if (data.user) {
      await prisma.user.upsert({
        where: {
          email: data.user.email,
        },
        create: {
          name: data.user.user_metadata.name,
          fullName: data.user.user_metadata.full_name,
          email: data.user.email!,
          avatarUrl: data.user.user_metadata.avatar_url,
          authUID: data.user.id,
        },
        update: {
          name: data.user.user_metadata.name,
          fullName: data.user.user_metadata.full_name,
          email: data.user.email!,
          avatarUrl: data.user.user_metadata.avatar_url,
          authUID: data.user.id,
        },
      });
    }

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(
    `${origin}/auth/auth-code-error?message=could not login with provider`
  );
}
