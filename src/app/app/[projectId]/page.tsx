import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

import React from 'react';
import { putFeedback } from './actions';

async function getProject(projectId: string) {
  const prisma = new PrismaClient();

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!project) {
    redirect('/404');
  }

  return project;
}

async function ProjectDetailPage({
  params,
}: {
  params: { projectId: string };
}) {
  await getProject(params.projectId);

  return (
    <>
      <form action={putFeedback}>
        <input type='text' name='pid' id='pid' value={params.projectId}></input>
        <button type='submit'>put</button>
      </form>
    </>
  );
}

export default ProjectDetailPage;
