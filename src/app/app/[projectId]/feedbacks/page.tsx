'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import FeedbackItem from './components/feedback-item';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import path from 'path';

const FEEDBACK_MOCKS = [
  {
    id: '1',
    screenshotSrc:
      'https://plus.unsplash.com/premium_photo-1680740103993-21639956f3f0?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'The page layout breaks on mobile devices.',
    type: 'ISSUE',
    page: '/home',
    device: 'iPhone 12',
    createdAt: '2024-06-20T08:30:00Z',
  },
  {
    id: '2',
    screenshotSrc:
      'https://plus.unsplash.com/premium_photo-1680740103993-21639956f3f0?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'Great user experience on the new feature!',
    type: 'ISSUE',
    page: '/features',
    device: 'Samsung Galaxy S21',
    createdAt: '2024-06-19T10:45:00Z',
  },
  {
    id: '3',
    screenshotSrc:
      'https://plus.unsplash.com/premium_photo-1680740103993-21639956f3f0?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'The color scheme is difficult to read.',
    type: 'OTHER',
    page: '/contact',
    device: 'Google Pixel 6',
    createdAt: '2024-06-18T12:20:00Z',
  },
  {
    id: '4',
    screenshotSrc:
      'https://plus.unsplash.com/premium_photo-1680740103993-21639956f3f0?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'I love the new dashboard design!',
    type: 'IDEA',
    page: '/dashboard',
    device: 'iPad Pro',
    createdAt: '2024-06-17T14:35:00Z',
  },
  {
    id: '5',
    screenshotSrc:
      'https://plus.unsplash.com/premium_photo-1680740103993-21639956f3f0?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'The search function is not working properly.',
    type: 'OTHER',
    page: '/search',
    device: 'iPhone SE',
    createdAt: '2024-06-16T09:15:00Z',
  },
  {
    id: '6',
    screenshotSrc:
      'https://plus.unsplash.com/premium_photo-1680740103993-21639956f3f0?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'It would be great to have a dark mode option.',
    type: 'IDEA',
    page: '/settings',
    device: 'OnePlus 9',
    createdAt: '2024-06-15T16:50:00Z',
  },
  {
    id: '7',
    screenshotSrc:
      'https://plus.unsplash.com/premium_photo-1680740103993-21639956f3f0?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'The form validation messages are not clear.',
    type: 'ISSUE',
    page: '/signup',
    device: 'MacBook Pro',
    createdAt: '2024-06-14T11:25:00Z',
  },
  {
    id: '8',
    screenshotSrc:
      'https://plus.unsplash.com/premium_photo-1680740103993-21639956f3f0?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'Fantastic customer support!',
    type: 'OTHER',
    page: '/support',
    device: 'Surface Pro',
    createdAt: '2024-06-13T13:40:00Z',
  },
  {
    id: '9',
    screenshotSrc:
      'https://plus.unsplash.com/premium_photo-1680740103993-21639956f3f0?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'The images take too long to load.',
    type: 'ISSUE',
    page: '/gallery',
    device: 'Samsung Galaxy Tab S7',
    createdAt: '2024-06-12T07:55:00Z',
  },
  {
    id: '10',
    screenshotSrc:
      'https://plus.unsplash.com/premium_photo-1680740103993-21639956f3f0?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'Could you add more payment options?',
    type: 'IDEA',
    page: '/checkout',
    device: 'iPhone 13',
    createdAt: '2024-06-11T18:05:00Z',
  },
];

function DashboardPage() {
  const [tab, setTab] = useState('all');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onTabChange = (value: string) => {
    setTab(value);

    router.replace(pathname + `?tab=${value}`);
  };

  const search = searchParams.get('tab') ?? 'all';

  const feedbacks =
    search === 'all'
      ? FEEDBACK_MOCKS
      : FEEDBACK_MOCKS.filter((each) => each.type === search?.toUpperCase());

  return (
    <div className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
        <Tabs defaultValue='all' onValueChange={onTabChange}>
        <div className='flex items-center'>
            <TabsList>
            <TabsTrigger value='all'>All</TabsTrigger>
            <TabsTrigger value='issue'>Issue</TabsTrigger>
            <TabsTrigger value='idea'>Idea</TabsTrigger>
            <TabsTrigger value='other'>Other</TabsTrigger>
            <TabsTrigger value='archived' className='hidden sm:flex'>
                Archived
            </TabsTrigger>
            </TabsList>
            <div className='ml-auto flex items-center gap-2'>
            {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='h-7 gap-1'>
                    <ListFilter className='h-3.5 w-3.5' />
                    <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                    Filter
                    </span>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                    Issue
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Idea</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Other</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                    Archived
                </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu> */}
            {/* <Button size='sm' variant='outline' className='h-7 gap-1'>
                <File className='h-3.5 w-3.5' />
                <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                Export
                </span>
            </Button>
            <Button size='sm' className='h-7 gap-1'>
                <PlusCircle className='h-3.5 w-3.5' />
                <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                Add Product
                </span>
            </Button> */}
            </div>
        </div>

        <TabsContent value={tab}>
            <Card x-chunk='dashboard-06-chunk-0'>
            <CardHeader>
                <CardTitle>Feedbacks</CardTitle>
                <CardDescription>Manage your feedbacks.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className='hidden w-[100px] sm:table-cell'>
                        <span className='sr-only'>Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Page</TableHead>
                    <TableHead className='hidden md:table-cell'>
                        Device
                    </TableHead>
                    <TableHead className='hidden md:table-cell'>
                        Created at
                    </TableHead>
                    <TableHead>
                        <span className='sr-only'>Actions</span>
                    </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {feedbacks.map((feedback) => (
                    <FeedbackItem
                        key={feedback.id}
                        screenshotSrc={feedback.screenshotSrc}
                        text={feedback.text}
                        type={feedback.type}
                        page={feedback.page}
                        device={feedback.device}
                        createdAt={feedback.createdAt}
                    />
                    ))}
                </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className='text-xs text-muted-foreground'>
                Showing <strong>1-10</strong> of <strong>32</strong>{' '}
                products
                </div>
            </CardFooter>
            </Card>
        </TabsContent>
        </Tabs>
    </div>
  );
}

export default DashboardPage;
