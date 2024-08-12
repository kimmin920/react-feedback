'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';

export default function ProjectNavigations() {
  const params = useParams<{ projectId: string }>();
  // const pathname = usePathname();
  const pathname = usePathname();
  const projectId = params.projectId;

  if (!projectId) {
    return <></>;
  }

  const currentPath = pathname.split(`/${projectId}/`)[1];

  return (
    <nav className='flex items-center space-x-4 lg:space-x-6 mx-6'>
      <MyLink
        href='feedbacks'
        text='Feedbacks'
        active={currentPath === 'feedbacks'}
      />
      <MyLink href='editor' text='Editor' active={currentPath === 'editor'} />
    </nav>
  );
}

function MyLink({
  text,
  href,
  active,
}: {
  text: string;
  href: string;
  active: boolean;
}) {
  if (!active) {
    return (
      <Link href={href} legacyBehavior passHref>
        <a className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'>
          {text}
        </a>
      </Link>
    );
  }

  return (
    <Link href={href} legacyBehavior passHref>
      <a className='text-sm font-medium transition-colors hover:text-primary'>
        {text}
      </a>
    </Link>
  );
}
