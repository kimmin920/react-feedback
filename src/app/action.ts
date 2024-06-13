'use server';
import { PrismaClient } from '@prisma/client';

export async function createUser() {
  const prisma = new PrismaClient();
  const user = await prisma.user.create({
    data: {
      name: 'minus',
      email: 'emai2l@gmail.com',
      age: 27,
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
    select: {
      name: true,
      userPreference: true,
    },
  });

  console.log(user);
  return user;
}

export async function deleteUser() {
  const prisma = new PrismaClient();
  await prisma.user.deleteMany();
}
