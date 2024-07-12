'use client';

import { useQuery } from '@tanstack/react-query';

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
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeedbackItem from './components/feedback-item';
import { useState } from 'react';
import axios from 'axios';
import { Feedback } from '@prisma/client';
import Feedbacks from './components/feedbacks';

interface FeedbackResponse {
  feedbacks: Feedback[];
  total: number;
  page: number;
  limit: number;
}

const fetchFeedbacks = async (
  pid: string,
  page: number,
  limit: number,
  filter: string
) => {
  const { data } = await axios.get<FeedbackResponse>('/api/feedbacks', {
    params: { pid, page, limit, filter },
  });

  return data;
};

function DashboardPage({ params }: { params: { projectId: string } }) {
  const [filter, setFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError } = useQuery<FeedbackResponse, Error>({
    queryKey: [filter, page, limit],
    queryFn: () => fetchFeedbacks(params.projectId, page, limit, filter),
  });

  const onTabChange = (value: string) => {
    setFilter(value);
    setPage(1);
  };

  const goNextPage = () => {
    if (data && page < Math.ceil(data.total / limit)) {
      setPage(page + 1);
    }
  };

  const getCanNextPage = () => {
    return data ? page >= Math.ceil(data.total / limit) : true;
  };

  const goPrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const getCanPreviousPage = () => {
    return page === 1;
  };

  return (
    <div className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <Tabs defaultValue={filter} onValueChange={onTabChange}>
        <div className='flex items-center'>
          <TabsList>
            <TabsTrigger value='ALL'>All</TabsTrigger>
            <TabsTrigger value='ISSUE'>Issue</TabsTrigger>
            <TabsTrigger value='IDEA'>Idea</TabsTrigger>
            <TabsTrigger value='OTHERS'>Other</TabsTrigger>
            <TabsTrigger value='ARCHIVED' className='hidden sm:flex'>
              Archived
            </TabsTrigger>
          </TabsList>

          <div className='ml-auto flex items-center gap-2'>
            <div className='space-x-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={goPrevPage}
                disabled={getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={goNextPage}
                disabled={getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        <TabsContent value={filter}>
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
                  <Feedbacks
                    feedbacks={data?.feedbacks ?? []}
                    isLoading={isLoading}
                    isError={isError}
                  />
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              {data && (
                <div className='text-xs text-muted-foreground'>
                  Showing
                  <strong>
                    {parsePageLimit(data.page, data.limit, data.total)}
                  </strong>
                  of <strong>{data.total}</strong> feedbacks
                </div>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const parsePageLimit = (page: number, limit: number, total: number): string => {
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return `${start}-${end}`;
};

export default DashboardPage;
