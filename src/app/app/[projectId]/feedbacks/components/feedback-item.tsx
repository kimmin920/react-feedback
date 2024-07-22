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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type FeedbackType = 'IDEA' | 'ISSUE' | 'OTHERS';

type FeedbackItemProps = {
  id: string;
  screenshotSrc: string;
  text: string;
  type: FeedbackType;
  page: string;
  device: string;
  createdAt: Date;
  isArchived: boolean;
};

function FeedbackItem({
  id,
  screenshotSrc,
  text,
  type,
  page,
  device,
  createdAt,
  isArchived,
}: FeedbackItemProps) {
  const queryClient = useQueryClient();

  const archiveMutation = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/feedbacks/${id}/archive`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['feedbacks'] as any);
    },
  });

  const unarchiveMutation = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/feedbacks/${id}/unarchive`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['feedbacks'] as any);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/feedbacks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['feedbacks'] as any);
    },
  });

  const onClickArchive = async () => {
    try {
      await archiveMutation.mutateAsync();
      // 아카이브 성공 후 추가 작업 (예: 알림 표시)
    } catch (error) {
      console.error('Failed to archive feedback:', error);
      // 오류 처리 (예: 알림 표시)
    }
  };

  const onClickUnarchive = async () => {
    try {
      await unarchiveMutation.mutateAsync();
      // 아카이브 성공 후 추가 작업 (예: 알림 표시)
    } catch (error) {
      console.error('Failed to archive feedback:', error);
      // 오류 처리 (예: 알림 표시)
    }
  };

  const onClickDelete = async () => {
    try {
      await deleteMutation.mutateAsync();
      // 삭제 성공 후 추가 작업 (예: 알림 표시)
    } catch (error) {
      console.error('Failed to delete feedback:', error);
      // 오류 처리 (예: 알림 표시)
    }
  };

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
      <TableCell className='font-medium'>
        <div className='min-w-full'>{text}</div>
      </TableCell>

      <TableCell>
        {type === 'ISSUE' && (
          <Badge variant='destructive'>{type.toLocaleLowerCase()}</Badge>
        )}
        {type === 'IDEA' && (
          <Badge className='bg-blue-500'>{type.toLocaleLowerCase()}</Badge>
        )}
        {type === 'OTHERS' && (
          <Badge variant='secondary'>{type.toLocaleLowerCase()}</Badge>
        )}
      </TableCell>

      <TableCell>{page}</TableCell>
      <TableCell className='hidden md:table-cell'>{device}</TableCell>
      <TableCell className='hidden md:table-cell'>
        {createdAt.toString()}
      </TableCell>
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

            {isArchived ? (
              <DropdownMenuItem onClick={onClickUnarchive}>
                Restore
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={onClickArchive}>
                Archive
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={onClickDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default FeedbackItem;
