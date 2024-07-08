import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

import React from 'react';

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

  return <div>{params.projectId}</div>;
}

export default ProjectDetailPage;
