import { PrismaClient } from '@prisma/client';
import { createClient } from '@utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';
import { getProjects } from './actions';

async function getProjectsFromApp(projectId?: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const projects = await getProjects(user!.id);

  if (!projectId && projects.length > 0) {
    const firstProjectId = projects[0].id;
    redirect(`app/${firstProjectId}`);
  }
}

async function AppPage({ params }: { params: { projectId: string } }) {
  await getProjectsFromApp(params.projectId);
  return <div>No Projects yet! Create now!</div>;
}

export default AppPage;
