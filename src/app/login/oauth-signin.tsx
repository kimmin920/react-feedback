'use client';

import { Button } from '@/components/ui/button';
import { Provider } from '@supabase/supabase-js';
import { YoutubeIcon } from 'lucide-react';
import { oAuthSignIn } from './actions';

type OauthProvider = {
  name: Provider;
  displayName: string;
  icon?: JSX.Element;
};

export function OauthButtons() {
  const oAuthProviders: OauthProvider[] = [
    {
      name: 'google',
      displayName: 'Google',
      icon: <YoutubeIcon className='size-5' />,
    },
  ];

  return (
    <>
      {oAuthProviders.map((provider) => (
        <Button
          key={provider.name}
          variant='outline'
          onClick={async () => {
            await oAuthSignIn(provider.name);
          }}
        >
          {provider.icon}
          Login with {provider.displayName}
        </Button>
      ))}
    </>
  );
}
