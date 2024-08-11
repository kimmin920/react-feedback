import { createClient } from '@utils/supabase/server';
import Header from './components/header';
import ProjectSwitcher from './components/project-switcher';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // NOTE: must redirect to home
    return redirect('/login');
  }

  return (
    <div className='h-screen w-screen flex flex-col items-center'>
      <Header user={user} />
      <main className='flex-1 bg-background text-foreground w-full pt-4 pb-4 max-w-screen-xl'>
        {children}
      </main>
    </div>
  );
}
