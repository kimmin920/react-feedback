import { TableRow, TableCell } from '@/components/ui/table';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function FeedbackItemSkeleton() {
  return (
    <TableRow>
      <TableCell className='hidden sm:table-cell'>
        <Skeleton className='h-16 w-16 aspect-square rounded-md' />
      </TableCell>
      <TableCell className='font-medium space-y-2'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-2/3' />
      </TableCell>

      <TableCell>
        <Skeleton className='h-4 w-full' />
      </TableCell>

      <TableCell>
        <Skeleton className='h-4 w-full' />
      </TableCell>
      <TableCell className='hidden md:table-cell'>
        <Skeleton className='h-4 w-full' />
      </TableCell>
      <TableCell className='hidden md:table-cell'>
        <Skeleton className='h-4 w-1/2' />
      </TableCell>
    </TableRow>
  );
}

export default FeedbackItemSkeleton;
