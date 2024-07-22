'use server';

import { FeedbackType, PrismaClient } from '@prisma/client';

export async function submitFeedback({
  pid,
  content,
  rate,
  imageSrc,
  device,
  type,
}: {
  pid: string;
  content: string;
  rate: number;
  imageSrc: string;
  device: string;
  type: FeedbackType;
}) {
  const prisma = new PrismaClient();

  await prisma.feedback.create({
    data: {
      projectId: pid,
      content,
      rate,
      imageSrc,
      device, // TEST-DEVICE-0, TEST-DEVICE-1, ..., TEST-DEVICE-4
      type, // IDEA, CONCEPT, PROTOTYPE 순환
    },
  });
}
