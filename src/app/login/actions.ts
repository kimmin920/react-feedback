'use server';
import { redirect } from 'next/navigation';
import { createClient } from '@utils/supabase/server';
import { Provider } from '@supabase/supabase-js';
import { getURL } from '@utils/helpers';


export async function oAuthSignIn(provider: Provider) {
  if (!provider) {
    return redirect('/login?message=No provider selected');
  }

  const supabase = createClient();
  const redirectUrl = getURL('/auth/callback');
  console.log(redirectUrl)
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    redirect('/login?message=Could not authenticate user');
  }
  console.log('go-to-url', data.url)
  return redirect(data.url);
}

export async function signOut() {
  const supabase = createClient();

  await supabase.auth.signOut();
  redirect('/login');
}
