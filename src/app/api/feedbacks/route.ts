import { NextRequest, NextResponse } from 'next/server';
import { FeedbackType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function filterParser(filter: string | null) {
  if (!filter) {
    return {};
  }

  switch (filter) {
    case 'ALL':
      return { type: undefined, isArchived: false };
    case 'ARCHIVED':
      return { isArchived: true };
    default:
      return { type: filter as FeedbackType, isArchived: false };
  }
}
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const pid = searchParams.get('pid')!;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const filter = filterParser(searchParams.get('filter'));

  const skip = (page - 1) * limit;

  const feedbacks = await prisma.feedback.findMany({
    skip,
    take: limit,
    where: {
      ...filter,
      projectId: pid,
    },
  });

  const totalFeedbacks = await prisma.feedback.count({
    where: {
      ...filter,
      projectId: pid,
    },
  });

  return NextResponse.json({
    feedbacks,
    total: totalFeedbacks,
    page,
    limit,
  });
}
