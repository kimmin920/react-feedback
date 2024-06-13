import { createClient } from '@utils/supabase/server';
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
    return <div>no-user</div>;
  }

  const metadata = user.user_metadata as UserMetadata;

  return (
    <ul>
      {Object.entries(metadata).map(([key, value]) => {
        return (
          <li key={key}>
            {key} : {value.toString()}
          </li>
        );
      })}
    </ul>
  );
}

export default ProfilePage;
