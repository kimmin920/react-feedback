import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type FeedbackType = 'IDEA' | 'ISSUE' | 'OTHER';

type FeedbackItemProps = {
  screenshotSrc: string;
  text: string;
  type: FeedbackType;
  page: string;
  device: string;
  createdAt: string;
};

function FeedbackItem({
  screenshotSrc,
  text,
  type,
  page,
  device,
  createdAt,
}: FeedbackItemProps) {
  return (
    <TableRow>
      <TableCell className='hidden sm:table-cell'>
        <Image
          alt='Feedback screenshot img'
          className='aspect-square rounded-md object-cover'
          height='64'
          src={screenshotSrc}
          width='64'
        />
      </TableCell>
      <TableCell className='font-medium'>{text}</TableCell>

      <TableCell>
        {type === 'ISSUE' && (
          <Badge variant='destructive'>{type.toLocaleLowerCase()}</Badge>
        )}
        {type === 'IDEA' && (
          <Badge className='bg-blue-500'>{type.toLocaleLowerCase()}</Badge>
        )}
        {type === 'OTHER' && (
          <Badge variant='secondary'>{type.toLocaleLowerCase()}</Badge>
        )}
      </TableCell>

      <TableCell>{page}</TableCell>
      <TableCell className='hidden md:table-cell'>{device}</TableCell>
      <TableCell className='hidden md:table-cell'>{createdAt}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup='true' size='icon' variant='ghost'>
              <MoreHorizontal className='h-4 w-4' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Archive</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default FeedbackItem;
