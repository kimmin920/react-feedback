import { NextRequest, NextResponse } from 'next/server';
import { FeedbackType, PrismaClient, Project } from '@prisma/client';

const prisma = new PrismaClient();

export interface ProjectsResponse {
  projects: Project[];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const userId = searchParams.get('userId')!;

  const projects = await prisma.project.findMany({
    where: {
      userId,
    },
  });

  return NextResponse.json({
    projects,
  });
}
