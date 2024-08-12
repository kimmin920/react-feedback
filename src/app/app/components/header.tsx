import React from 'react';
import ProjectSwitcher from './project-switcher';
import { UserNav } from '@/components/ui/user-nav';
import { Separator } from '@/components/ui/separator';
import { UserMetadata } from '@/app/profile/page';
import { User } from '@supabase/supabase-js';
import { getProjects } from '../actions';
import ProjectNavigations from './project-navigations';
import Link from 'next/link';

async function Header({ user }: { user: User }) {
  const userMetadata = user.user_metadata as UserMetadata;

  return (
    <header className='z-10 sticky top-0 border-b w-full backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='flex h-16 items-center px-4'>
        <div className='space-x-4 flex flex-row justify-center items-center'>
          <Link href='/'>
            <div className='font-bold'>Feedback.space</div>
          </Link>
          <Separator className='h-[20px]' orientation='vertical' />
          {user.id && <ProjectSwitcher userId={user!.id} />}
        </div>

        <ProjectNavigations />

        <div className='ml-auto flex items-center space-x-4'>
          <UserNav
            avatarUrl={userMetadata.avatar_url}
            email={userMetadata.email}
            name={userMetadata.name}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
