'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function insertProject(formData: FormData) {
  const name = formData.get('project-name') as string;
  const userId = formData.get('user-id') as string;

  const project = await prisma.project.create({
    data: {
      userId,
      name,
    },
  });

  redirect(`/app/${project.id}`);
}

export async function getProjects(userId: string) {
  const prisma = new PrismaClient();

  const projects = await prisma.project.findMany({
    where: {
      userId,
    },
  });

  return projects ?? [];
}
