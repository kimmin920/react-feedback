import { createClient } from '@utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';

export type UserMetadata = {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  phone_verified: boolean;
  picture: string;
  provider_id: string;
  sub: string;
};

async function ProfilePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const metadata = user.user_metadata as UserMetadata;

  return (
    <div className='h-screen w-screen flex flex-col items-center'>
      <Header user={user} />
      <Profile
        avatar_url={metadata.avatar_url}
        full_name={metadata.full_name}
        email={metadata.email}
        email_verified={metadata.email_verified}
        picture={metadata.picture}
      />
    </div>
    // <ul>
    //   <Profile
    //     avatar_url={metadata.avatar_url}
    //     full_name={metadata.full_name}
    //     email={metadata.email}
    //     email_verified={metadata.email_verified}
    //     picture={metadata.picture}
    //   />
    //   {/* {Object.entries(metadata).map(([key, value]) => {
    //     return (
    //       <li key={key}>
    //         {key} : {value.toString()}
    //       </li>
    //     );
    //   })} */}
    // </ul>
  );
}

import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '../app/components/header';

type ProfileProps = {
  avatar_url: string;
  full_name: string;
  email: string;
  email_verified: boolean;
  picture: string;
};

const Profile: React.FC<ProfileProps> = ({
  avatar_url,
  full_name,
  email,
  email_verified,
  picture,
}) => {
  return (
    <div className='flex items-center gap-4 mt-4'>
      <Avatar className='h-20 w-20'>
        <AvatarImage src={picture} alt='Avatar' />
        <AvatarFallback>{full_name[0]}</AvatarFallback>
      </Avatar>
      <div className='grid gap-1'>
        <p className='scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl'>
          {full_name}
        </p>
        <p className='text-sm text-muted-foreground'>{email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
