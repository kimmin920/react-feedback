import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const prisma = new PrismaClient();
  const { id } = params;

  try {
    const feedback = await prisma.feedback.update({
      where: { id },
      data: { isArchived: true },
    });
    return NextResponse.json(feedback);
  } catch (error) {
    return NextResponse.error();
  }
}
