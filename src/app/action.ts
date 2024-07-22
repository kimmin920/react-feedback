'use server';
import { PrismaClient } from '@prisma/client';

export async function deleteUser() {
  const prisma = new PrismaClient();
  await prisma.user.deleteMany();
}
