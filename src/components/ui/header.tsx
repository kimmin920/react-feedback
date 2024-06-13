import { createClient } from '@utils/supabase/server';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { Button } from './button';
import { signOut } from '@/app/login/actions';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const prisma = new PrismaClient();

async function Header() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className='z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 max-w-screen-2xl items-center'>
        <nav className='flex items-center space-x-4 lg:space-x-6'>
          <a className='mr-6 flex items-center space-x-2' href='/'>
            <span className='font-bold'>my-app</span>
          </a>
          <Link href='/'>main</Link>
        </nav>
        <div className='flex flex-1 items-center justify-end space-x-2'>
          {user !== null ? (
            <form action={signOut} className='flex items-center gap-2'>
              <Avatar>
                <AvatarImage src={user.user_metadata.avatar_url} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <Button>Sign Out</Button>
            </form>
          ) : (
            <Button asChild>
              <Link href='/login'>Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
