'use client';

import * as React from 'react';
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useParams, useRouter } from 'next/navigation';
import { insertProject } from '../actions';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ProjectsResponse } from '@/app/api/projects/route';
import { Project } from '@prisma/client';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {
  userId: string;
}

const fetchProjects = async (userId: string) => {
  const { data } = await axios.get<ProjectsResponse>('/api/projects', {
    params: { userId },
  });

  return data;
};

export default function ProjectSwitcher({
  userId,
  className,
}: TeamSwitcherProps) {
  const router = useRouter();
  const params = useParams();

  const { data, isLoading, isError } = useQuery<ProjectsResponse, Error>({
    queryKey: [userId],
    queryFn: () => fetchProjects(userId),
  });

  const projects = data?.projects ?? [];
  const projectId = params.projectId;

  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);

  const [selectedProject, setSelectedProject] = React.useState<Project | null>(
    () => projects.find((pj) => pj.id === projectId) ?? null
  );

  React.useEffect(() => {
    if (projects.length === 0) {
      return;
    }

    const project = projects.find((pj) => pj.id === projectId);

    if (!project) {
      return;
    }

    setSelectedProject(project);
  }, [projects, projectId]);

  if (isLoading) {
    return (
      <Button
        disabled
        variant='outline'
        role='combobox'
        aria-label='Select a team'
        className={cn('w-[200px] justify-between', className)}
      ></Button>
    );
  }

  if (isError) {
    return (
      <Button
        disabled
        variant='outline'
        role='combobox'
        aria-label='Select a team'
        className={cn('w-[200px] justify-between', className)}
      >
        Error: fetching projects
      </Button>
    );
  }

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            aria-label='Select a team'
            className={cn('w-[200px] justify-between', className)}
          >
            {selectedProject ? (
              <>
                <Avatar className='mr-2 h-5 w-5'>
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${selectedProject.id}.png`}
                    alt={selectedProject.name}
                    className='grayscale'
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                {selectedProject.name}
                <CaretSortIcon className='ml-auto h-4 w-4 shrink-0 opacity-50' />
              </>
            ) : (
              <>⭐️ Create New Project ⭐️</>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandList>
              <CommandGroup>
                {projects &&
                  projects.length > 0 &&
                  projects.map((group) => (
                    <CommandItem
                      key={group.id}
                      onSelect={() => {
                        setSelectedProject(group);
                        setOpen(false);
                        router.push(`/app/${group.id}`);
                      }}
                      className='text-sm'
                    >
                      <Avatar className='mr-2 h-5 w-5'>
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${group.id}.png`}
                          alt={group.name}
                          className='grayscale'
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {group.name}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          selectedProject?.id === group.id
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircledIcon className='mr-2 h-5 w-5' />
                    New Project
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <form action={insertProject}>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>
              Add a new project to manage feedbacks.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className='space-y-4 py-2 pb-4'>
              <div className='space-y-2'>
                <input hidden name='user-id' value={userId} />
                <Label htmlFor='project-name'>Project name</Label>
                <Input
                  id='project-name'
                  name='project-name'
                  placeholder='Humpback'
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => setShowNewTeamDialog(false)}
            >
              Cancel
            </Button>
            <Button type='submit' onClick={() => setShowNewTeamDialog(false)}>
              Continue
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
