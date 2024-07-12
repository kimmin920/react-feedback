'use server';

import { PrismaClient } from '@prisma/client';

export async function putFeedback(formData: FormData) {
  const prisma = new PrismaClient();
  const pid = formData.get('pid');

  const generateData = (count: number) => {
    return Array.from({ length: count }, (_, index) => ({
      projectId: pid,
      content: `content ${String.fromCharCode(97 + (index % 26))}`, // a, b, c, ..., z, a, b, ...
      rate: Math.floor(Math.random() * 5) + 1, // 1에서 5 사이의 랜덤 숫자
      imageSrc: `image-src-${index}`,
      device: `TEST-DEVICE-${index % 5}`, // TEST-DEVICE-0, TEST-DEVICE-1, ..., TEST-DEVICE-4
      type: ['IDEA', 'ISSUE', 'OTHERS'][index % 3], // IDEA, CONCEPT, PROTOTYPE 순환
    }));
  };

  await prisma.feedback.createMany({
    data: generateData(100) as any,
  });
}
