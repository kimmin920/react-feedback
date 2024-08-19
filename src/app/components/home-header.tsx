import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';

function HomeHeader() {
  return (
    <header className='z-10 sticky top-0 w-full'>
      <div className='flex h-16 items-center px-4'>
        <div className='space-x-4 flex flex-row justify-center items-center'>
          <Link href='/'>
            <div className='font-bold'>Feedback.space</div>
          </Link>
        </div>

        <div className='ml-auto flex items-center space-x-4'>
          <Link href='/app'>
            <Button>Get started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;
