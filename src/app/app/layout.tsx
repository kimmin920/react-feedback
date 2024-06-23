import { createClient } from '@utils/supabase/server';
import Header from './components/header';
import ProjectSwitcher from './components/project-switcher';

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
    return <div>no-user</div>;
  }

  return (
    <>
      <Header user={user} />
      <main className='sticky top-0 bg-background text-foreground w-screen h-screen'>
        {children}
      </main>
    </>
  );
}
