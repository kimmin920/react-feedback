import React from 'react';
import ProjectSwitcher from './project-switcher';
import { UserNav } from '@/components/ui/user-nav';
import { Separator } from '@/components/ui/separator';

import { UserMetadata } from '@/app/profile/page';
import { User } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/dist/server/api-utils';
import { getProjects } from '../actions';

async function Header({ user }: { user: User }) {
  const projects = await getProjects(user.id);

  const userMetadata = user.user_metadata as UserMetadata;

  return (
    <header className='sticky border-b w-full'>
      <div className='flex h-16 items-center px-4'>
        <div className='space-x-4 flex flex-row justify-center items-center'>
          <div className='font-bold'>Feedback.io</div>
          <Separator className='h-[20px]' orientation='vertical' />
          <ProjectSwitcher projects={projects} userId={user!.id} />
        </div>
        {/* <MainNav className='mx-6' /> */}
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
