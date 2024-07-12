import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const feedback = await prisma.feedback.update({
      where: { id },
      data: { isArchived: false },
    });
    return NextResponse.json(feedback);
  } catch (error) {
    return NextResponse.error();
  }
}
