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
      data: { isArchived: true },
    });
    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error updating feedback:', error); // Logging the error for debugging
    return NextResponse.error();
  }
}
