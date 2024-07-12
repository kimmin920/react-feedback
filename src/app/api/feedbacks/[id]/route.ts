import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await prisma.feedback.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Feedback deleted' });
  } catch (error) {
    return NextResponse.error();
  }
}
